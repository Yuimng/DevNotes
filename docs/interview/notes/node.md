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
