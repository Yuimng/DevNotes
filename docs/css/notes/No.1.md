# Note 1

## 用 css 样式修改 svg、图片颜色

主要是利用 css 滤镜的投影 drop-shadow 来实现，方法是将原 svg 或 png 图片移动到网页看不见的地方，然后对 svg 或图片投影到原位置，影子实心不虚散，对影子进行颜色控制。

其实也就是在元素位置显示元素的影子，这个影子颜色是可以随意指定的。

```css
:root {
  --color: #7a65ee; /* 站点主题颜色 */
  --svg-offset: 20000px; /* 位移距离 */
}

.icon {
  width: 16px;
  height: 16px;
  position: relative;
  left: calc(
    var(--svg-offset) * -1
  ); /* 移动到窗口外很远的地方，也可以用transform: translateY(-20000px); */
  filter: drop-shadow(var(--color) var(--svg-offset) 0);
}
.icon:hover {
  filter: drop-shadow(white var(--svg-offset) 0);
}
```

```html
<div>
  <!-- svg -->
  <img src="./image/a.svg" class="icon" />
  <!-- 图片 -->
  <img src="./image/logo.png" class="icon" />
</div>
```

### 学习来源

- [jsper 对应文章](https://www.cnblogs.com/jsper/p/18302986)
