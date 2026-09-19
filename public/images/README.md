# images

放你自己要展示的图片，比如相册模块用的图。

## 怎么用

1. 把图片复制到这个目录，例如 `public/images/photo.jpg`
2. 在 `src/config/modules.config.ts` 的 `gallery` 模块里引用：

```ts
{
  src: '/images/photo.jpg',   // 路径以 /images/ 开头，不要写 public
  alt: '图片描述',             // 给屏幕阅读器用，尽量写清楚
  caption: '显示在图上的小字',
}
```

图片会自动裁成 4:3 并带悬停放大效果，所以横构图效果最好。
