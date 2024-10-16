# JavaScript复习

## 浏览器内核

- Trident  —— IE浏览器
- Webkit —— 苹果Safari
- Gecko —— 火狐 Firefox  
- Blink —— 谷歌Chrome

##  页面渲染整体流程 

1. 解析 HTML 文件，构建 DOM 树。
2. 解析 CSS 文件，构建 CSSOM 树。
3. 将 DOM 树和 CSSOM 树合并成渲染树。
4. 生成布局树，计算每个元素在页面上的位置和大小。
5. 绘制渲染树，将渲染树上的元素绘制成屏幕上的像素。
6. 合成层，将多个图层合并成一个图层，以便使用 GPU 进行加速。
7. 使用 GPU 加速，对图层进行合成，形成最终的图像。
8. 如果发生重绘或回流操作，重新执行步骤 4-7。

 ## V8引擎的工作过程 

1. JavaScript代码词法分析，标记变量名、关键字、运算符等
2. 语法分析将标记转成 **抽象语法树（AST）**
3. 转字节码
4. 转机器码执行

## JS内存管理

在JavaScript中，内存分为栈内存和堆内存两种类型。

- 栈内存用于存储基本数据类型和引用类型的地址，它具有自动分配和自动释放的特点
- 堆内存用于存储引用类型的对象和数组等数据结构，它需要手动分配和释放内存

 对于那些不再使用的对象，我们都称之为是垃圾，它需要被回收，以释放更多的内存空间。

**引用计数（Reference counting）**

引用计数（Reference counting）是一种常见的垃圾回收算法。

- 它的基本思想是在对象中添加一个引用计数器。
- 每当有一个指针引用该对象时，引用计数器就加一。
- 当指针不再引用该对象时，引用计数器就减一。
- 当引用计数器的值为0时，表示该对象不再被引用，可以被回收。

**标记清除（mark-Sweep）**

标记清除（mark-Sweep）是一种常见的垃圾回收算法，其核心思想是可达性（Reachability）。算法的实现过程如下：

1. 设置一个根对象（root object），垃圾回收器会定期从这个根开始，找所有从根开始有引用到的对象。
2. 对于每一个找到的对象，标记为可达（mark），表示该对象正在使用中。
3. 对于所有没有被标记为可达的对象，即不可达对象，就认为是不可用的对象，需要被回收。
4. 回收不可达对象所占用的内存空间，并将其加入空闲内存池中，以备将来重新分配使用。

## 闭包

 一个函数和对其周围状态（lexical environment，词法环境）的引用捆绑在一起（或者说函数被引用包围），这样的组合就是闭包（closure） 闭包，让你可以在一个内层函数中访问到其外层函数的作用域 。

闭包就是创建一个函数，然后能够访问外层作用域的变量，那么它就是一个闭包，一般在嵌套函数中的内层函数就是闭包。

**内存泄漏**

 为闭包会引用外部函数的变量对象，如果这个闭包被长期保存，那么外部函数的变量对象就会一直存在内存中，无法被垃圾回收。 

```javascript
function createAdder(count) {
  function adder(num) {
    return count + num
  }

  return adder
}

var adder8 = createAdder(8) // 内层函数 的引用一直在  无法回收
adder8 = null // 清除引用 可回收
```

## This指向

1.函数在调用时，JavaScript会默认给this绑定一个值；

2.this的绑定和定义的位置（编写的位置）没有关系；

3.this的绑定和调用方式以及调用的位置有关系；

4.this是在运行时被绑定的；

**绑定**

- 默认绑定  window
- 隐式绑定
- 显示绑定  call apply bind   显示绑定在null undefined --> window
- new绑定

 new绑定 > 显示绑定（bind）> 隐式绑定 > 默认绑定 



 箭头函数并不绑定this对象，那么this引用就会从上层作用域中找到对应的this 

```javascript
var obj = {
  data: [],
  getData: function() {
    var _this = this;
    setTimeout(function() {
      // 模拟获取到的数据
      var res = ["abc", "cba", "nba"];
      _this.data.push(...res);
    }, 1000);
  }
}

obj.getData();


var obj = {
  data: [],
  getData: function() {
    setTimeout(() => {
      // 模拟获取到的数据
      var res = ["abc", "cba", "nba"];
      this.data.push(...res);
    }, 1000);
  }
}

obj.getData();
```

## 手写 Call 和 Apply

```javascript
Function.prototype.ymcall = function(thisObj, ...args) {
    // 获取函数
    var fn = this;
    // 判断绑定对象
    thisObj = (thisObj !== null && thisObj !== undefiend) ? Object(thisObj) : window;
    // 绑定this
    thisObj.fn = fn
    // 执行并返回结果
    var result = thisObj.fn(...args)
    delete thisObj.fn
    return result
}

Function.prototype.ymapply = function(thisObj, argArray) {
    // 获取函数
    var fn = this;
    // 判断绑定对象
    thisObj = (thisObj !== null && thisObj !== undefiend) ? Object(thisObj) : window;
    // 绑定this
    thisObj.fn = fn
    argArray = argArray || []
    // 执行并返回结果
    var result = thisObj.fn(argArray)
    delete thisObj.fn
    return result
}
```

## 纯函数

- 此函数在相同的输入值时，需产生相同的输出 
- 该函数不能有语义上可观察的函数副作用，诸如“触发事件”，使输出设备输出，或更改输出值以外物件的内容等 

如   slice  截取数组时不会对原数组进行任何操作,而是生成一个新的数组 

## 柯里化函数

```javascript
var log = date => type => message => {
  console.log(`[${date.getHours()}:${date.getMinutes()}] [${type}] [${message}]`)
}

var logNow = log(new Date())
logNow("DEBUG")("轮播图bug")
logNow("DEBUG")("点击无效bug")
logNow("FEATURE")("添加新功能")

var logNowDebug = log(new Date())("DEBUG")
logNowDebug("轮播图bug")
logNowDebug("点击无效bug")
```

##  面向对象

面向对象有三大特性：封装、继承、多态

- 封装：我们前面将属性和方法封装到一个类中，可以称之为封装的过程；
- 继承：继承是面向对象中非常重要的，不仅仅可以减少重复代码的数量，也是多态前提（纯面向对象中）；
- 多态：不同的对象在执行时表现出不同的形态；

## Object.defineProperty

- **Configurable** // true or false
  表示能否通过delete删除属性从而重新定义属性，能否修改属性的特性，或者能否把属性修改为访问器属性。像前面例子中那样直接在对象上定义的属性，它们的这个特性默认值为true。
- **Writable** // true or false
  表示能否修改属性的值。像前面例子中那样直接在对象上定义的属性，它们的这个特性默认值为true。
- **Enumerable** // true or false表示能否通过for-in循环返回属性。像前面例子中那样直接在对象上定义的属性，它们的这个特性默认值为true。
- **Value** // everty thing
  包含这个属性的数据值。读取属性值的时候，从这个位置读；写入属性值的时候，把新值保存在这个位置。这个特性的默认值为undefined。
- **set （访问器）** // function or undefined
  在写入属性时调用的函数。默认值为undefined。
- **get （访问器）**// function or undefined 
  在读取属性时调用的函数。默认值为undefined。

```javascript
var person = {
    birth: 2000,
    age:  17
};
Object.defineProperty(person, "birth", {
    configurable: false,
    enumerable: false,
    writable: false,
    value: 2000
}); 

Object.defineProperty(person, 'year', {
    get: function () {
        return this.birth + this.age;
    },
    set: function (newValue) {
        this.age = newValue - this.birth;
    }
});
```

## 构造函数

- 创建一个新对象, 这个新的对象类型其实就是Person类型.
- 将构造函数的作用域赋给新对象（因此this就指向了这个新对象，也就是this绑定）；
- 执行构造函数中的代码（为这个新对象添加属性和方法）；
- 返回新对象, 但是是默认返回的, 不需要使用return语句；

```javascript
function Person(name, age) {
  this.name = name
  this.age = age
}

const person1 = new Person('james',35)
```

new关键字的步骤如下：

- 1.在内存中创建一个新的对象（空对象）；
- 2.这个对象内部的[[prototype]]属性会被赋值为该构造函数的prototype属性；（后面详细讲）；
- 3.构造函数内部的this，会指向创建出来的新对象；
- 4.执行函数的内部代码（函数体代码）；
- 5.如果构造函数没有返回非空对象，则返回创建出来的新对象；

## 原型

- 创建的每个函数都有一个prototype（原型）属性
- 这个属性是一个指针，指向一个对象
- 而这个对象的作用是存放这个类型创建的所有实例共享的属性和方法
- 指向的这个对象, 就是我们的所谓的原型对象.

**原型对象的作用:** 使用原型对象的好处是可以让所有对象实例共享它所包含的属性和方法，不必在构造函数中定义对象实例的信息，而是可以将这些信息直接添加到原型对象中。

```javascript
function Person() {}

Person.prototype.name = "james"
Person.prototype.age = 18
Person.prototype.sayHello = function () {
    alert(this.name)
}
var person1 = new Person()
person1.sayHello() // james
```

创建的实例对象 都指向构造函数的原型对象

```javascript
person1.__proto__ === Person.prototype
```

 通过 **hasOwnProperty** 判断属性属于实例还是原型. 

```javascript
alert(person1.hasOwnProperty("name")) // true
```

原型对象都包含一个指向构造函数的指针, 通过constructor指针, 指向构造函数 

原型对象如果通过字面量重写了，这个指向就消失了

## 原型链



原型链就是将构造函数的原型对象重写，指向到另一个构造函数的实例（如 new Animal()）

```
function Person() {
}

function Animal() {
}

// 原型链形成
Person.prototype = new Animal()

var person = new Person()

alert(person instanceof Object) // true
alert(person instanceof Animal) // true
alert(person instanceof Person) // true
```

查找属性和方法等会一层层往上找，找到即返回， 终点Object的指向是null 

```javascript
Object.prototype === null
```



## 继承

- 组合继承

```javascript
function Person(name, age) {
    // 通过经典继承实现对实例属性的继承, 以及可以在构造函数中传递参数.
    Animal.call(this, age)
    this.name = name
}

// 使用原型链实现对原型属性和方法的继承.
Person.prototype = new Animal(0)
```

- 原型式继承

```
// 使用原型式继承
var person = {
    name: "Coderwhy",
    colors: ["red", "green"]
}

// function object(o) {
//    function F() {}
//    F.prototype = o
//    return new F()
//}
// 通过person去创建另外一个对象  继承了对象，又保证了不修改原对象
var person1 = Object.create(person, {
    name: {
        value: "Kobe"
    }
})
person1.colors.push("blue")

alert(person1.name) // Kobe
alert(person1.colors) // red,green,blue

alert(person.name) // Coderwhy
alert(person.colors) // red,green,blue
```

- 寄生式继承

```javascript
// 封装object函数
function object(o) {
    function F() {}
    F.prototype = o
    return new F()
}

// 封装创建新对象的函数
function createAnother(original) {
    var clone = object(original)
    // 使新的实例对象不仅会拥有person的属性和方法, 而且还有自己定义的方法.
    clone.sayHello = function () {
        alert("Hello JavaScript")
    }
    return clone
}
```

- 寄生式组合继承

```javascript
// 定义object函数
function object(o) {
    function F() {}
    F.prototype = o
    return new F()
}

// 定义寄生式核心函数
function inhreitPrototype(subType, superType) {
    var prototype = object(superType.prototype)
    prototype.constructor = subType
    subType.prototype = prototype
}
```

```javascript
// 定义Animal构造函数
function Animal(age) {
    this.age = age
    this.colors = ["red", "green"]
}

// 给Animal添加方法
Animal.prototype.animalFunction = function () {
    alert("Hello Animal")
}

// 定义Person构造函数
function Person(name, age) {
    Animal.call(this, age)
    this.name = name
}

// 使用寄生组合式核心函数
inhreitPrototype(Person, Animal)

// 给Person添加方法
Person.prototype.personFunction = function () {
    alert("Hello Person")
}
```

这种方式的高效体现在现在它只调用了一次Animal的构造函数.

并且也避免了在原型上面多出的多余属性, 而且原型之间不会产生任何的干扰(子类型原型和父类型原型之间)

## ES6+

- 类 
- 扩展语法
- 剩余参数
- let const： 块级作用域、暂时性死区
- 模板字符串
- 箭头函数
- Symbol
- Map WeakMap  Set WeekSet
- Proxy
- Reflect
- Promise
- async/await

## 类

```javascript
class Person {
  constructor(name, age) {
    this.name = name
    this.age = age
  }
  eating() {
    console.log(this.name + " eating~")
  }

  static create() {
    console.log("Person create")
  }
}

class Student extends Person {
  constructor(name, age, sno) {
    super(name, age)
    this.sno = sno
  }
  // 方法的重写
  eating() {
    console.log("做完作业~")
    super.eating()
  }

  static create() {
    super.create()
    console.log("Student create")
  }
}

var stu = new Student()
stu.eating()

Student.create()
```

## Promise async/await

**Promise作用**

- 解决回调地狱问题
- 更好地处理异步操作
- 简化异步操作的错误处理
- 并行执行多个异步操作
- 控制异步操作的执行流程和支持异步操作的串行执行等

**Promise 三个状态**

- pending 
- fullfilled 执行了resolve
- rejected 执行了reject

```javascript
const promise = new Promise((resolve, reject) => {
  // resolve("fulfilled")
  reject("reject")
})

promise.then(res => {
  console.log("res:", res)
}).catch(err => {
  console.log("err:", err)
}).finally(() => {
  console.log("finally action")
})
```

Promise.all()   全部resolve 则返回  其中一个reject则reject

Promise.allSettled() 全部都会返回 不论resolve还是reject

Promise.race()  返回最快的resolve或者reject

Promise.any()  返回最快的resolve，有reject且全部reject则返回reject

```javascript
const p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("1111")
  }, 1000);
})

const p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("2222")
  }, 100); 
})

const p3 = new Promise((resolve, reject) => {
  setTimeout(() => {
    reject("3333")
  }, 3000);
})

Promise.any([p1, p2, p3]).then(res => {
  console.log(res)
}).catch(err => {
  console.log("err:", err)
})

// err: [ 1111, 22222, 3333 ] //按排序 不按定时器
```



## 事件循环

事件循环**Event Loop**是 JavaScript 单线程执行模型的核心机制，是处理异步事件时它会先加入到事件队列中挂起，等主线程空闲时会去执行事件队列（Event Queue）中的事件。如此反复循环。

- 先同步再异步，异步中先微任务，再宏任务  

- 执行宏任务前需要清空微任务

- 宏任务 setTimeout

- 微任务  async  await promise process.nextTick

## 模块化

- Commonjs

require()  modules.export = {}

- ESModule

import  export 

## 防抖 节流 

**应用场景：**

- 防抖：输入框搜索、窗口大小调整、按钮点击防止重复提交等需要等待用户停止操作后再执行的场景。
- 节流：滚动事件处理、鼠标移动事件、页面滚动加载、限制请求频率等需要控制函数执行频率的场景。

**防抖应用场景**

1. 登录、发短信等按钮避免用户点击太快，以致于发送了多次请求，需要防抖
2. 调整浏览器窗口大小时，resize 次数过于频繁，造成计算过多，此时需要一次到位，就用到了防抖
3. 文本编辑器实时保存，当无任何更改操作一秒后进行保存

**节流应用场景**

1. `scroll` 事件，每隔一秒计算一次位置信息等
2. 浏览器播放事件，每个一秒计算一次进度信息等
3. input 框实时搜索并发送请求展示下拉列表，每隔一秒发送一次请求 (也可做防抖)

```javascript
function debounce(fn, delay) {
    let timer = null
    const _debounce = function() {
        if (timer) clearTimeout(timer)
        timer =  setTimeout(()=> {
        	fn()
    	}, delay)   
    }
	return _debounce
}

function throttle(fn, interval) {
    let lastTime = 0
    const _throttle = function() {
        const nowTime = newDate().getTime()
        const remainTime = interval - (nowTime - lastTime)
        if(remainTime <= 0) {
            fn()
            lastTime = nowTime
        }
    }
    return _throttle
}
```

## 深拷贝

```java
function isObject(value) {
  const valueType = typeof value
  return (value !== null) && (valueType === "object" || valueType === "function")
}

function deepClone(originValue) {
  // 判断传入的originValue是否是一个对象类型
  if (!isObject(originValue)) {
    return originValue
  }

  const newObject = {}
  for (const key in originValue) {
    newObject[key] = deepClone(originValue[key]) // 递归，不是对象时直接返回值
  }
  return newObject
}
```



## 事件总线

## 实现图片懒加载原理

```javascript
const images = document.querySelectorAll("img");
const lazyLoad = () => {
    images.forEach((item) => {
        // 触发条件为img元素的CSSOM对象到视口顶部的距离 < 100px + 视口高度
        // +100px为了提前触发图片加载
        if (
            item.getBoundingClientRect().top <
            document.documentElement.clientHeight + 100
        ) {
            if ("src" in item.dataset) {
                item.src = item.dataset.src;   // 临时存放  img data-src=""
            }
        }
    });
};
document.addEventListener("scroll", _.throttle(lazyLoad, 200)); //加节流监听滚动事件
```

## 设计模式

###  单例设计模式

基于单独的实例来管理某一个模块中的内容，实现模块之间的独立划分，而且还可以实现模块之间方法的相互调用。

```javascript
// 程序员A开发的模块A
var AModule = (function () {
  var data = [];

  function bindHTML() {
    // ...
  }

  function change() {
    // ...
  }

  return {
    change: change
  }
})();

// 程序员B开发的模块B
var BModule = (function () {
  var data = [];

  function bindHTML() {
    // ...
  }

  AModule.change();

  return {
    bindHTML: bindHTML
  }
})();
```

```javascript
// 从业务来讲：按照一定的顺序依次执行对应的方法，从而实现整个板块的功能的开发
let SearchModule = (function () {
  let body = document.body

  function queryData() {}

  function bindHTML() {}

  function handle() {}

  return {
    // init 相当于大脑，可以控制谁先执行，谁后执行 结合[命令模式]
    init: function () {
      queryData();
      bindHTML();
      handle();
    }
  }
})();

SearchModule.init();
```

### 构造器模式
单例设计模式关联影响问题
```javascript
let AModule = (function () {
    let arr = [];

    let change = function change(val) {
        arr.push(val);
        console.log(arr);
    };

    return {
        change: change
    };
})();

AModule.change(10); 
AModule.change(20);
// 如果不想每一次执行change,都修改使用相同的东西,这样会产生关联和影响? 
```

Constructor [kənˈstrʌktər]构造器模式
  + 类&实例
  + 私有&公有属性方法
  + 插件组件封装

```javascript
// AModule:类「构造函数」
class AModule {
    constructor() {
        // this->每个类的实例
        this.arr = [];
    }
    // 原型上 公共的属性和方法
    change(val) {
        this.arr.push(val);
        console.log(this.arr);
    }
}

let A1 = new AModule;
let A2 = new AModule;
console.log(A1, A2);
console.log(A1 === A2); //->false
console.log(A1.arr === A2.arr); //->false
console.log(A1.change === A2.change); //->true
A1.change(10);
A2.change(20); 

```

构造器模式的每一个实例都是一个单独的空间，有自己的私有属性和方法，也有公共的属性方法。

### 工厂模式


Factory [ˈfæktri]工厂模式
  + 简单的工厂模式

项目：一个产品 调用数据库，根据量级或者需求等不同的因素，我们需要让产品切换调用到不同的数据库中 oracle sqlserver mysql  -> DB层，根据逻辑或者标识，能切换连接的数据库

工厂模式：工厂可以帮助我们实现调用的切换，或者实现一些中转的处理

```javascript
function factory(options) {
    options = options || {};
    let {
        type,
        payload
    } = options;
    if (type === 'array') {
        // 执行A，完成一个逻辑
        return;
    }
    // 执行B，完成另外的逻辑
}
factory({
    type: 'array',
    payload: 100
});

factory({
    type: 'object',
    payload: 'zhufeng'
}); 
```

### 观察者模式

```javascript
// 观察者模式:vue2.0响应式原理...
class Observer {
    update(message) {
        // 消息触达，通知update执行
        console.log('消息接收！', message);
    }
}
class Demo {
    update(message) {
        console.log('消息接收！', message);
    }
}

//目标
class ObserverList {
    constructor() {
        this.observerList = [];
    }
    add(observer) {
        this.observerList.push(observer);
        return this;
    }
    remove(observer) {
        this.observerList = this.observerList.filter(ob => ob !== observer);
        return this;
    }
    get(index) {
        return this.observerList[index];
    }
    count() {
        return this.observerList.length;
    }
}
class Subject {
    observers = new ObserverList;
    add(observer) {
        this.observers.add(observer);
    }
    remove(observer) {
        this.observers.remove(observer);
    }
    notify(...params) {
        for (let i = 0; i < this.observers.count(); i++) {
            let item = this.observers.get(i);
            item.update(...params);
        }
    }
}

let sub = new Subject;
sub.add(new Observer);
sub.add(new Observer);
sub.add(new Demo);
setTimeout(() => {
    sub.notify('你好~~');
}, 1000);
```