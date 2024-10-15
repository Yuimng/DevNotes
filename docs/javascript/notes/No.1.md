# Note 1

## 数组去重

```js
var values = [1, 1, 2, 3, 3, 4]
var mySet = new Set(values)
values = [...mySet]
console.log(values) // [1, 2, 3, 4]
```

## 监听滚动条变化

```js
// 防抖
function throttle (fn, delay = 300) {
  var valid = true
  return function () {
    if (valid) {
      valid = false // 将函数置为无效
      setTimeout(() => {
        fn()
        valid = true
      }, delay)
    }
    return false // valid为false时，函数不执行
  }
}
function showTop () {
  var scrollTop = document.body.scrollTop || document.documentElement.scrollTop
  console.log('滚动条位置：' + scrollTop)
}
window.onscroll = throttle(showTop, 300)
```