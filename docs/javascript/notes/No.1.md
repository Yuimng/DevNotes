# Note 1

## 数组去重

```js
var values = [1, 1, 2, 3, 3, 4]
var mySet = new Set(values)
values = [...mySet]
console.log(values) // [1, 2, 3, 4]
```

## 实现图片懒加载原理

```js
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

## 打乱数组元素shuffle方法

得到一个两数之间的随机整数
```
let max, min = 10, 5;
let res = Math.floor(Math.random() * (max - min)) + min; //不含最大值，含最小值
```
得到一个两数之间的随机整数，包括两个数在内
```
let max, min = 10, 5;
let res = Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值 
```
Fisher-Yates shuffle方法
```
let students = ["学生1", "学生2", "学生3", "学生4", "调皮学生"]

function shuffle(arr) {
  let length = arr.length, index, temp;

  for (let point = length - 1; point >= 0; point--) {
    // index 随 point 随机生成数 如 point = 4 + 1 取 0-4
    index = Math.floor(Math.random() * (point + 1))
    // 随机交换
    temp = arr[index];
    arr[index] = arr[point];
    arr[point] = temp;
  }

  return arr;
}

console.log(shuffle(students))
```

## 二分查找元素
```
let arr1 = [3, 48, 66, 71, 99, 101, 120, 151, 18, 209];

function searching(target, arr) {
  let start = 0, end = arr.length - 1, middle, element;
  //  start <= end 直到剩下1个元素或两个元素比较
  while (start <= end) {
    // 减半取整 取中间
    middle = Math.floor((start + end) / 2);
    element = arr[middle];
    if (element === target) {
      return middle;
    } else if (target < element) {
      // 如果取到的目标数小于中间数 结尾数取中间-1 即往小区间取
      end = middle - 1;
    } else {
      // 如果取到的目标数小于中间数 起始数取中间+1 即往大区间取
      start = middle + 1;
    }
  }
  return -1; // 没找到返回-1
}

console.log(searching(99, arr1))
console.log(searching(88, arr1))
```