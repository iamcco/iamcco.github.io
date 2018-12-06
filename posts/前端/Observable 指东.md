RxJS 的核心：Observable

可以毫不负责的说，RxJS 的一切都建立在 Observable 之上。

关于 Observable 必须要知道的几个基本概念：

- Observable 可观察对象 (本次的主角，一个惰性的值的集合，同步，异步)
- Observer 观察者 (next/error/complete 回调函数集合，用来监听 Observable 的值)
- Subscription 订阅 (相当于 Observable 流的具柄)
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

RxJS 的所有操作符，一切的骚操作等都是围着这几个生命周期展开的，而真正拉动 Observable 齿轮的主要关注点在于 **订阅** 和 **执行**。

**订阅 执行**：

```javascript
function subscriber(observer) {
  observer.next(1);
  observer.next(2);
  observer.next(3);
}

const observable = Rx.Observable.create(subscriber);

const observer = {
  next: res => console.log(`next: ${res}`),
  error: err => console.error(`error: ${err}`),
  complete: () => console.log('done'),
}

observable.subscribe(observer);
```

输出：

```
1
2
3
```

上面的代码中 `subscribe(observer)` 就是订阅部分，而 `subscriber()` 就是执行部分。
但是在上面的代码中，我们只是声明了 `subscriber` 函数，并作为参数传给了 `create` ，
代码没有进行 `subscriber()` 调用，所以这个调用只能是 Observable 内部进行的。要清楚
Observable 是如何联动起来的，最简单的方法就看 RxJS 源码。

下面是一个非常简单的 Observable 实现:

```typescript
class Observable {
    static create(subscriber) {
        return new Observable(subscriber)
    }

    constructor(private subscriber) {}

    subscribe(observer) {
        return this.subscriber(observer)
    }
}
```

使用：

```typescript
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

而 `subscribe` 就是把 `subscriber(observer)` 这一步连接了起来。到这里估计会有疑问，
就是为啥 Observable 要设计了 `subscribe` 这么一环。明明非常简单的代码，
还搞出那么多概念。要搞清楚 Observable 为啥要搞这么多幺蛾子，可能还需要再看一下有关
Observable 的描述：Observable 是一个可观察对象。

惰性，只有观察了，才会流动，有点像唯心主义，只有你看了它，它才会存在（流动）

创建类操作符，一些常用模型的建立

操作符，通过组合操作，是灵活性达到极致

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

- 冷 Observable 热 Observable
- [Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
- [Observable](https://tc39.github.io/proposal-observable/)
