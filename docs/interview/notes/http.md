# HTTP复习

## HTTP 状态码

### 301 Moved Permanently

永久重定向。http 转向 https时，有时会使用 301，如 B 站。

### 302 Found

暂时重定向。http 转向 https时，有时也会使用 302，如知乎

### 304 Not Modified

资源已被缓存，与之相关的响应头部有：

- `ETag`
- `last-modified`/`if-modified-since`

一般用作 `index.html` 等不带 hash 的资源，由于示例太多，这里就不举例了

### 307 Temporary Redirect

暂时重定向。也可作为 http 到 https 的重定向。还有一种用途用作 HSTS，当谷歌浏览器发现某 http 资源已被加入到 HSTS 列表，浏览器内部会通过 307 作重定向

### 400 Bad Request

对于服务器无法理解的参数，将会使用 400 作为返回码

### 401 Unauthorized

当没有权限的用户请求需要带有权限的资源时，会返回 401，此时携带正确的权限凭证再试一次可以解决问题

有时认证失败也会返回 401

 一般代表没有携带 token，或者 token 失效，而造成对该资源没有权限。需重新认证，传递正确的 token。 

### 403 Forbidden

我就是不想让你访问，不管你的权限凭证是否正确！

 一般代表用户所拥有的权限不满足该资源的权限。如学生去访问教师资源，学生 A 访问学生 B 的成绩单等数据资源。还有一种情况是爬虫爬取页面被监控到而返回 403。 

### 404 Not Found

未找到资源

### 405 Method Not Allowed

我需要 POST 这条资源，你去 GET 个锤子

### 500 Internal Server Error

服务器内部错误，很有可能是应用层未捕获错误而导致整个服务挂掉

### 502 Bad Gateway

Nginx 上常见，从上游应用层未返回响应，上游应用层挂了