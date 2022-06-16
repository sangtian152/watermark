class EventQueue {
    constructor() {
        this.current = ''
        this.gen = null
        // 用于存储事件队列中每个事件状态
        this.queue = {}
        // 事件队列
        this.events = new Map()
    }
    // 生成器函数
    *generator(){
        for(let [key, value] of this.events) {
            const { fn, arg } = value
            this.current = key
            this.queue[key] = 'starting'
            yield fn(...arg);
        }
    }
    // 当前事件状态改变通知执行下一步或完成
    notify() {
        const { gen, queue, current } = this
        if(queue[current]  === 'finish') {
          if(gen) {
              let res = gen.next()
              if(res.done) {
                    this.done()
              }
          }
        }
    }
    // 监听对象
    defineReactive (obj, key, val) {
        const _this = this
        const property = Object.getOwnPropertyDescriptor(obj, key);
        if (property && property.configurable === false) {
          return
        }
        // cater for pre-defined getter/setters
        const getter = property && property.get;
        const setter = property && property.set;
        if ((!getter || setter) && arguments.length === 2) {
          val = obj[key];
        }
    
        Object.defineProperty(obj, key, {
          enumerable: true,
          configurable: true,
          get: function reactiveGetter () {
            const value = getter ? getter.call(obj) : val;
            return value
          },
          set: function reactiveSetter (newVal) {
            const value = getter ? getter.call(obj) : val;
            /* eslint-disable no-self-compare */
            if (newVal === value || (newVal !== newVal && value !== value)) {
              return
            }
            // #7981: for accessor properties without setter
            if (getter && !setter) { return }
            if (setter) {
              setter.call(obj, newVal);
            } else {
              val = newVal;
            }
            _this.notify()
          }
        });
    }
    // 添加事件队列
    add(fn, arg) {
        const timestamp = new Date().getTime()
        const key = Symbol(timestamp)
        this.events.set(key, {fn, arg})
        this.queue[key] = 'waiting'
        // 监听当前事件状态
        this.defineReactive(this.queue, key)
    }
    // 开始执行事件队列
    start() {
        this.gen = this.generator()
        this.gen.next()
    }
    // 下一步
    next() {
        setTimeout(()=>{
            this.queue[this.current] = 'finish'
        }, 0)
    }
    // 完成事件队列
    done() {
        this.gen = null
        this.queue = null
        this.events = null
        if(typeof this.end === 'function') {
            this.end()
        }
    }
}

export default EventQueue;