### Reference

- [Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
- [Observable](https://tc39.github.io/proposal-observable/)

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
