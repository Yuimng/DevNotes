# Node复习

## Node结构

app —— router—— controller —— middleware —— servcie —— models

## 跨域处理

```javascript
export const corsHandler = {
  origin: function (ctx: Context) {
    return '*'  // 允许访问地址
  },
  exposeHeaders: ['Authorization'],
  maxAge: 7 * 24 * 60 * 60,
  // credentials: true,
  allowMethods: ['GET', 'POST', 'OPTIONS', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Requested-With'],
}
```

## token授权（待续）

jsonwebtoken

```javascript
// token无效直接进入错误提醒
const result = jwt.verify(token, PUBLIC_KEY, {
    algorithms: ['RS256'],
})
```


## SSE

### SSE的工作原理和特性
SSE是一种基于HTTP协议的单向实时数据推送技术，允许服务器在不需要客户端轮询的情况下，主动向客户端发送新的数据。其主要特性包括：

‌文本格式的数据传输‌：只能发送通过utf-8编码的数据。
‌自动重连‌：如果连接断开，浏览器会自动发起重连，默认延迟3秒。
‌事件ID支持‌：可用于浏览器断线重连后补发数据。
‌轻量级‌：相比WebSocket，SSE基于HTTP协议，且浏览器原生支持断线重连，相对更加简单易用‌1。

### SSE与WebSocket的区别
虽然SSE和WebSocket都用于实现实时通信，但它们在通信模式、协议、数据类型、连接保持和复杂度等方面有所不同：

‌通信模式‌：SSE是单向的（服务端到客户端），而WebSocket是双向的（服务端和客户端）。
‌协议‌：SSE基于HTTP协议，而WebSocket有自己的协议。
‌数据类型‌：SSE只能发送纯文本数据，而WebSocket可以发送文本或二进制数据。
‌连接保持‌：SSE保持HTTP长连接，断线后自动重连；WebSocket需要应用层处理断线重连逻辑。
‌复杂度‌：SSE相对简单易用，而WebSocket较为复杂，需要更多的管理和维护‌1。

### SSE的使用场景
SSE适用于需要服务端到客户端单向通信的场景，例如：

‌服务器日志推送‌
‌服务器状态监控‌
‌天气、股票行情等实时更新‌
‌新闻推送或社交媒体动态更新‌
‌大语言模型流式输出响应内容‌‌

### SSE的断线重连机制
‌Server-Sent Events（SSE）在浏览器中的自动断联时间默认设置为3秒‌。如果连接断开，浏览器会自动发起重连，默认延迟3秒后重新连接‌1。

### SSE（Server-Sent Events）心跳机制，可以通过以下步骤实现：

创建一个HTTP服务器。
对于每个连接，设置一个interval定时器，定时发送事件。
如果连接关闭，清除定时器。
```javascript
const http = require('http');
 
const server = http.createServer();
 
server.on('request', (req, res) => {
  if (req.method === 'GET' && req.headers['accept'].includes('text/event-stream')) {
    // 设置Content-Type
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    });
 
    // 定时发送事件
    const interval = setInterval(() => {
      res.write('data: ping\n\n');
    }, 3000); // 每3秒发送一次心跳
 
    // 当连接关闭时清理定时器
    res.on('close', () => {
      clearInterval(interval);
    });
  } else {
    res.end();
  }
});
 
server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

## docker 是什么

docker 是一个容器技术，可以打包一个应用，把应用和依赖打包成一个镜像，然后把镜像部署到服务器上，然后服务器上运行这个镜像，这个镜像就相当于一个虚拟机，可以运行多个应用，每个应用都有自己的依赖，不会影响其他应用。

## kubernetes 是什么

kubernetes 是一个容器编排工具，可以部署多个应用到多个服务器上，然后自动分配资源，保证应用可用。

## node 是什么

Node.js 是一个开源与跨平台的 JavaScript 运行时环境，在浏览器外运行 V8 JavaScript 引擎（Google Chrome 的内核），利用事件驱动、非阻塞和异步输入输出模型等技术提高性能。

Node.js 就是一个服务端的、非阻塞I/O的、事件驱动的 JavaScript 运行环境。

### 非阻塞异步

Node.js 采用了非阻塞的异步 I/O 机制，在做I/O操作的时候不会造成任何的阻塞，当完成之后，以时间的形式通知执行操作

### 事件驱动

Node.js 采用了事件驱动架构，所有的异步操作都是通过事件触发的，比如文件读取、网络请求等，当完成之后，会触发一个事件，然后执行对应的回调函数

### 优缺点

优点：
- 处理高并发性能更加
- 适合I/O密集型应用
缺点：
- 单线程，不适合CPU密集型应用
- 只支持单核CPU, node.js多核CPU性能无法利用

## Node.js 中的事件循环是什么？
Node.js 的事件循环是实现异步编程的核心机制，基于事件和回调函数。它允许Node.js在不创建额外线程的情况下处理并发操作，特别是对于I/O密集型任务非常有效。
事件循环首先处理调用堆栈中的任务，然后再处理消息队列中的任务。
Node.js基本上所有的事件机制都是用设计模式中观察者模式实现，每个异步事件都生成一个事件观察者，如果有事件发生就调用相应的回调函数