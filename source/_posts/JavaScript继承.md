title: JavaScript 继承
date: 2016-04-27 18:00:56
tags:
 - javascript
categories:
 - 前端
---

关于JavaScript对象继承，由于JavaScript并没有类，所以对象的继承是通过原型链子来完成的。

一般的继承如下：

```
function Person(name, age) {
    this.name = name;
    this.age = age;
}

function Man() {
}

Man.prototype = new Person('lettleMing', 12);
Man.prototype.constructor = Man;

var man = new Man();

console.log(man.name, man.age);                 // lettleMing 12

```

上面是一般的继承的写法，在看看错误的写法：

```
function Person(name, age) {
    this.name = name;
    this.age = age;
}

function Man() {
    Man.prototype = new Person('lettleMing', 12);
    Man.prototype.constructor = Man;
}

var man = new Man();

console.log(man.name, man.age);                 // undefined undefined

```

之所以会出现上面这种情况，是由于不了解**new**操作符创建对象的过程。在`var man = new Man()`这句执行的过程中，首先：

1. 通过继承`Man.prototype`创建一个新的对象。
2. 使用`argumengs`参数调用`Man`构造方法，并且把`this`指向第一步创建的对象。
3. 如果`Man`方法没有`return`语句，即返回一个对象，则使用第一步生成的对象作为`new`表达式的返回值返回。

第二种方法由于在创建对象的过程中，继承这一步先于构造方法的执行，所以构造方法中对原型的修改并没有反应到新生成的对象当中。


##### 参考资料

1. [new 操作符]( https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new )
