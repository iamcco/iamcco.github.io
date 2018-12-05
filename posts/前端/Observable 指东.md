### roadmap

RXJS Observable:

```javascript
var observable = Rx.Observable.create(function (observer) {
  observer.next(1);
  observer.next(2);
  observer.next(3);
});

observable.subscribe({
  next: res => console.log(`next: ${res}`),
  error: err => console.error(`error: ${err}`),
  complete: () => console.log('done'),
});
```

subscribe 与 Observable 的齿轮是如何转动起来的

冷 Observable 热 Observable

一个简单的 Observable 实现:

```javascript
class Observable {
    static create(subscriber) {
        return new Observable(subscriber)
    }
    constructor(subscriber) {
        this.subscriber = subscriber
    }
    subscribe(observer) {
        return this.subscriber(observer)
    }
}

const obs1 = Observable.create(observer => {
    observer.next(1)
    observer.next(2)
})

const subscription1 = obs1.subscribe({
    next: res => console.log(res)
})
```

实现简单的操作符 map

```javascript
Observable.prototype.map = function(resolve) {
    return new Observable(observer =>{
        return this.subscribe({
            next: res => observer.next(resolve(res))
        })
    })
}
```

实现其他复杂的操作符 retryWhen startWith

Observable 终结状态: error complete

Observable 的另一个状态：取消订阅 unsubscribe

observer 包装

### Observable API

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
