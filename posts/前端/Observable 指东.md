RxJS 的基础：Observable

关于 Observable 的几个基本概念：

- Observable 可观察对象 (本次的主角，一个惰性的值的集合，同步，异步)
- Observer 观察者 (next/error/complete 回调函数集合，用来监听 Observable 的值)
- Subscription 订阅 (相当于 Observable 流的句柄)
- Operators 操作符 (map/filter/retryWhen/...)

Observable 的 **生命周期**:

1. 创建 Observable
   > new Observable(subscriber) 或 Observable.create(subscriber)
2. 订阅 Observable
   > observable.subscribe(Observer)
3. 执行 Observable
   > subscriber
4. 清理 Observable
   > subscription.unsubscribe

**订阅 执行**：

```javascript
function subscriber (observer) {
  observer.next(1)
  observer.next(2)
  observer.next(3)
}

const observable = Rx.Observable.create(subscriber)

const observer = {
  next: res => console.log(`next: ${res}`),
  error: err => console.error(`error: ${err}`),
  complete: () => console.log('done')
}

observable.subscribe(observer)
```

输出：

```
1
2
3
```

上面的代码中 `subscribe(observer)` 就是订阅部分，而 `subscriber()` 就是执行部分。
但是在上面的代码中，我们只是声明了 `subscriber` 函数，并作为参数传给了 `create` ，
代码没有进行 `subscriber()` 调用，所以这个调用只能是 Observable 内部进行的。

下面是一个非常简单的 Observable 实现:

```javascript
class Observable {
    static create(subscriber) {
        return new Observable(subscriber)
    }

    constructor(subscriber) {
        this.subscriber = subscriber
    }

    pipe(...operators) {
        return operators.reduce((preObservable, nextOperator) => nextOperator(preObservable), this)
    }

    subscribe(observer) {
        return this.subscriber(observer)
    }
}

```

使用：

```javascript
const observable = Observable.create(observer => {
  observer.next(1)
  observer.next(2)
  observer.next(3)
})

const subscription = observable.subscribe({
  next: res => console.log(res)
})
```

输出：

```
1
2
3
```

可以看到，一个超级简单的 Observable 就实现了，而且主要实现了 **订阅** 和 **执行**。
由于代码异常简单，所以我们可以非常清楚的看到，所谓订阅/执行，就是使用 Observer
调用 `subscribe` 订阅函数，而 `subscribe` 再拿 Observer 调用 `subscriber`，之后
`subscriber` 调用 `Observer.next` 最终观察者获得了它所监听的 Observable
的值（1，2，3），到这里一条**流**就形成了。而 `subscribe` 就是 `subscriber` 到
Observer 的桥梁。如果没有 `subscribe`，上面的代码可以更简单的写成下面这个样子：

```javascript
const subscriber = observer => {
  observer.next(1)
  observer.next(2)
  observer.next(3)
}

const observer = {
  next: res => console.log(res)
}

subscriber(observer)
```

而 `subscribe` 就是把 `subscriber(observer)` 这一步连接了起来。

在看会之前的概念：Observable 是一个可观察对象。

惰性，只有观察了，才会流动

有了这些特性就可以把一些常用模型的建立操作符，通过组合操作实现各种逻辑

实现简单的操作符

```javascript
function startWith (value) {
  return (observable) => {
    return new Observable(observer => {
      observer.next(value)
      return observable.subscribe({
        next: res => observer.next(res)
      })
    })
  }
}

function map (fn) {
  return (observable) => {
    return new Observable(observer => {
      return observable.subscribe({
        next: res => observer.next(fn(res))
      })
    })
  }
}
```


一个完整的 Observable 还需要关注的点：

- Observable 终结状态: error complete
- Observable 的另一个状态：取消订阅 unsubscribe

### Observable 提案:

Observable API

```typescript
interface Observable {

    constructor(subscriber : SubscriberFunction);

    // 订阅接收一个 Observer 观察者对象
    subscribe(observer : Observer) : Subscription;

    // 订阅接收函数:
    // onNext 对应 Observer.next
    // onError 对应 Observer.error
    // onComplete 对应 Observer.complete
    subscribe(onNext : Function,
              onError? : Function,
              onComplete? : Function) : Subscription;

    // 返回 Observable 自身
    [Symbol.observable]() : Observable;

    // 把参数转换为同步 Observable
    static of(...items) : Observable;

    // 把 Observable 或 可迭代对象转化为 Observable
    static from(observable) : Observable;

}

interface Subscription {

    // 取消订阅
    unsubscribe() : void;

    // 判断流是否已经终止
    get closed() : Boolean;
}

function SubscriberFunction(observer: SubscriptionObserver) : (void => void)|Subscription;
```

### Reference

- [Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
- [Observable](https://tc39.github.io/proposal-observable/)
