# Note 2

## 浅拷贝、深拷贝
```js
const obj = { a: 1, b: 2 };
// 浅拷贝
const shallowClone = Object.assign({}, obj);
// 深拷贝 无法拷贝 function undefined RegExp 等
const deepClone = JSON.parse(JSON.stringify(obj));
```

```js
// 深拷贝 
function deepClone(originValue) {
  // 判断是否是一个Set类型
  if (originValue instanceof Set) {
    return new Set([...originValue])
  }

  // 判断是否是一个Map类型
  if (originValue instanceof Map) {
    return new Map([...originValue])
  }

  // 判断如果是Symbol的value, 那么创建一个新的Symbol
  if (typeof originValue === "symbol") {
    return Symbol(originValue.description)
  }

  // 判断如果是函数类型, 那么直接使用同一个函数
  if (typeof originValue === "function") {
    return originValue
  }

  // 判断传入的originValue不是一个对象类型， 直接返回
  if (!(typeof originValue === "object")) {
    return originValue
  }

  // 判断传入的对象是数组, 还是对象
  const newObject = Array.isArray(originValue) ? []: {}
  for (const key in originValue) {
    newObject[key] = deepClone(originValue[key])
  }

  // 对Symbol的key进行特殊的处理
  const symbolKeys = Object.getOwnPropertySymbols(originValue)
  for (const sKey of symbolKeys) {
    // const newSKey = Symbol(sKey.description)
    newObject[sKey] = deepClone(originValue[sKey])
  }
  
  return newObject
}
```
