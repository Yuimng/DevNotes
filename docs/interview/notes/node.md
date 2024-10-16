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

