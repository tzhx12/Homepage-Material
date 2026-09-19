# Material You 个人主页模板

一个 Material You 风格的静态个人主页模板。配色由**单个种子色**自动推导，页面由**配置文件**自由编排，视觉偏可爱 / 二次元。

> 参考了静态博客模板 [fuwari](https://github.com/saicaca/fuwari) 的技术选型（Astro + Tailwind CSS）与做工水准，但形态完全不同：fuwari 是博客（文章、归档、分类、标签、RSS），本项目是**个人主页**——没有文章概念，换成一套可插拔的模块系统。

## 特性

- **Material You 动态取色**：改一个十六进制种子色，46 个 M3 颜色角色（primary / secondary / tertiary / error / 五级 surface container / outline / fixed 系列…）全部自动重算，明暗两套齐全。用的是 Google 官方的 HCT 算法，和 Android 12+ 从壁纸取色是同一套实现。
- **模块化配置**：增删模块 = 在数组里增删一项。九个内置模块：个人名片、链接、项目、技能、时间线、友链、数据统计、随笔、相册。
- **Mica 材质背景**：背景图重度模糊 + 一层跟随主题色的半透明覆盖层，卡片做成半透明浮在材质上。覆盖层不透明度可调，换背景图不会打乱整站配色。不想要图片也可以切成纯 CSS 光斑或纯色。
- **深色模式**：跟随系统，也可手动锁定浅色 / 深色，切换结果存在本地，且绘制前就应用好，不会闪白。
- **可爱风格**：大圆角、星星闪烁、头像旋转光环、点击涟漪、悬停上浮。
- **纯静态**：构建产物是纯 HTML/CSS/JS，可以托管在任何静态空间，运行时零外部请求。
- **性能与无障碍**：颜色零运行时开销（全部构建时算好）、尊重系统「减少动态效果」设置、禁用 JS 时内容依然完整可读、键盘焦点可见、语义化标签。

## 快速开始

需要 Node.js 20 或更高版本。

```bash
npm install      # 安装依赖
npm run dev      # 本地开发，默认 http://localhost:4321
npm run build    # 构建到 dist/
npm run preview  # 预览构建结果
```

## 配置

所有配置都在 `src/config/` 目录下，四个文件各管一件事：

| 文件 | 管什么 |
| --- | --- |
| `site.config.ts` | 站点标题、描述、语言、图标、页脚 |
| `theme.config.ts` | **配色种子色**、圆角、动效开关、**背景与 Mica 材质** |
| `profile.config.ts` | 头像、昵称、签名、简介、社交链接 |
| `modules.config.ts` | **页面上有哪些模块、什么顺序、各自内容** |

### 换配色

打开 `theme.config.ts`，改这一行就够了：

```ts
seedColor: '#8ECAE6',   // 天空蓝
```

一些参考值：

| 颜色 | 值 |
| --- | --- |
| 天空蓝（默认） | `#8ECAE6` |
| 樱花粉 | `#FF8FB1` |
| 薰衣草紫 | `#B39DDB` |
| 蜜桃橘 | `#FFB4A2` |
| 抹茶绿 | `#A8D8B9` |
| 草莓奶昔 | `#F4A6C0` |

不用管对比度——M3 的色调映射会保证前景色和背景色始终成对出现，自动满足可读性要求。

### 为什么图标底色是统一的

同一个模块里的一排图标，底色必须相同。这是 Material You 的硬规则：**同一类元素用同一个颜色角色**。

颜色角色（color role）就像「按数字涂色」里的数字——它是 UI 元素和颜色之间的映射关系，不是随便挑的调色板。Primary 用于最重要的元素，Secondary 用于次要的，Tertiary 用于需要特别强调的小元素。一排图标各用各的角色，看起来就不像同一套系统生成的了。

所以本模板全站只设一个强调色角色，在 `theme.config.ts`：

```ts
accentRole: 'primary',   // 'primary' 最醒目 / 'secondary' 更含蓄 / 'tertiary' 对比更强
```

图标底色、便签底色、数字颜色统一由它决定。改这一处，全站一起变，**从结构上保证不会出现同类元素颜色各异**。

确实需要单独强调某一条时，才用 `accent` 字段覆盖：

```ts
{ label: 'GitHub', href: '...', accent: 'tertiary' }   // 只有这一条换色
```

模块之间则按 M3 的角色分工使用不同色：特色项目卡用 `primaryContainer`（高强调）、状态徽章用 `tertiaryContainer`（M3 规范指定徽章用 tertiary）、次级按钮用 `secondaryContainer`（规范指定 tonal button 用它）。这不是不一致，而是不同元素类型各司其职。

### 换背景

`theme.config.ts` 的 `background` 段控制页面背景。默认是「一张图 + Mica 材质」：

```ts
background: {
  mode: 'image',          // 'image' 图片 / 'mesh' 纯 CSS 光斑 / 'plain' 纯色
  image: '/background.jpg',
  blur: 40,               // 背景模糊半径，Mica 的关键就在这一步
  overlayOpacity: 0.8,    // 覆盖层不透明度，最影响可读性的一个值
  translucentCards: true, // 卡片半透明，Mica 观感的另一半
  cardBlur: 0,            // 卡片再模糊一次，通常不需要
}
```

Mica 是 Windows 11 引入的材质：把壁纸重度模糊，再压一层跟随主题色的薄纱，内容浮在上面。因为覆盖层用的是主题色，**换背景图不会打乱整站配色**——背景只提供质感，色调依然由 `seedColor` 说了算。

换自己的背景图：把图片放进 `public/`，改 `image` 那一行。建议宽度 1600px 左右、控制在 500KB 以内。原图太大可以用 ffmpeg 处理：

```bash
ffmpeg -i 原图.jpg -vf "scale=1600:-2" -q:v 4 public/background.jpg
```

调背景明显程度的主旋钮是 `overlayOpacity`：`0.95` 背景几乎只剩一层色调，`0.6` 以下会很抢眼。**文字看不清就把它往上调**。

不想用图片的话，`mode: 'mesh'` 会用几个跟随主题色的柔和光斑当背景（零图片开销），`mode: 'plain'` 则是纯色。

### 加自己的图片

除了背景图，还有两个地方可以放图片：

- **相册模块**：图片放进 `public/images/`，然后在 `modules.config.ts` 的 `gallery` 模块里按 `{ src: '/images/xxx.jpg', alt: '描述', caption: '图注' }` 添加。图片会自动裁成 4:3，带悬停放大效果。
- **头像**：见 `profile.config.ts` 的 `avatar`，支持本地图片、网络地址或 emoji。它同时被顶部栏当作站点标识，所以换一处就够了。

### 从图片取色

想让配色贴合某张图，可以取它的主色当 `seedColor`：

```bash
magick 图片.jpg -resize 1x1 -format "%[hex:p{0,0}]" info:   # 需要 ImageMagick
```

把那串十六进制填进 `seedColor`，整套配色就会向这张图的色调靠拢。选图时也可以反过来——先定主题色，再挑色调接近的图，这样 Mica 覆盖层和图片不会互相打架。

### 增删模块

打开 `modules.config.ts`，整个数组的顺序就是页面上的显示顺序。

**删掉一个模块**：把那一整块删掉或注释掉。
**临时隐藏**：把 `enabled` 改成 `false`，内容留着以后用。
**调整顺序**：把整块上下移动。
**换内容**：改 `items` 里的条目。

每个模块都能用这些通用字段：

```ts
{
  type: 'projects',        // 模块类型，决定用哪个组件渲染
  enabled: true,           // 是否显示，默认 true
  title: '我的项目',        // 模块标题
  icon: '🧩',              // 标题前的图标（emoji 或内置图标名）
  hint: '做出来给世界看的东西', // 标题右侧的小字
  width: 'full',           // 'full' 占满整行，'half' 占半栏（默认）
  items: [ /* 该模块自己的内容 */ ],
}
```

下面是一个模块的全部可用写法：

```ts
// 个人名片。内容来自 profile.config.ts，这里只控制显示方式
{ type: 'profile', width: 'full', showBio: true, showMeta: true }

// 链接
{ type: 'links', items: [
  { icon: 'github', label: 'GitHub', description: '@tzhx12', href: 'https://github.com/tzhx12', accent: 'primary' },
]}

// 项目。featured: true 会用强调色填充
{ type: 'projects', items: [
  { name: '项目名', description: '一句话说明', href: '演示地址', repo: '源码地址',
    icon: '🌸', tags: ['Astro'], status: '进行中', featured: true },
]}

// 技能。level 是 1-5，不填就不显示熟练度圆点
{ type: 'skills', groups: [
  { category: '开发', items: [{ name: 'TypeScript', level: 4 }] },
]}

// 时间线
{ type: 'timeline', items: [
  { date: '2026.09', title: '发生了什么', description: '补充说明', icon: '🎉', tags: ['标签'] },
]}

// 友链
{ type: 'friends', items: [
  { name: '朋友', avatar: '🐱', description: '一句话', href: 'https://example.com' },
]}

// 数据统计
{ type: 'stats', items: [
  { label: '公开仓库', value: '2', suffix: '个', icon: '📦' },
]}

// 便签
{ type: 'notes', items: [
  { content: '想说的话', date: '2026.09', accent: 'primary' },
]}

// 图片墙。src 也可以直接写 emoji 当占位
{ type: 'gallery', width: 'full', columns: 3, items: [
  { src: '/photo.jpg', alt: '描述', caption: '图片说明', href: '点击跳转' },
]}
```

### 图标怎么写

凡是图标字段（`icon`），四种写法都支持，程序会自动判断：

```ts
icon: 'github'      // 内置品牌图标
icon: 'sun'         // 内置界面图标
icon: '🌸'          // 任意 emoji
icon: '/logo.png'   // 图片（public/ 下的路径或网络 URL）
```

内置品牌图标有：`github`、`x`、`bilibili`、`telegram`、`discord`、`steam`、`youtube`、`zhihu`、`qq`、`rss`。

想加新图标：去 [simpleicons.org](https://simpleicons.org) 找到图标，复制 SVG 里的 `d` 属性值，按格式加到 `src/components/ui/brand-icons.ts`。

### 加一种全新的模块类型

内置九个不够用时，加一个新类型只需三步：

1. 在 `src/components/modules/` 下写一个 `.astro` 组件，props 按需要定义。
2. 在 `src/config/modules.config.ts` 的类型定义里加上它的配置形状，并在 `modules` 数组里用起来。
3. 在 `src/pages/index.astro` 的 `registry` 对象里登记一行，把 `type` 映射到组件。

漏了第三步会在页面上看到一条明确的报错提示，不会静默失败。

## 部署

### GitHub Pages

推荐把仓库改名为 `<你的用户名>.github.io`，这样网址就是 `https://<用户名>.github.io`，最干净。然后在 `astro.config.mjs` 里：

```js
export default defineConfig({
  site: 'https://<用户名>.github.io',
  // ...
});
```

如果仓库用别的名字（比如本项目的 `Homepage-Material`），网址会带一层路径，需要额外加 `base`：

```js
export default defineConfig({
  site: 'https://<用户名>.github.io',
  base: '/Homepage-Material',
  // ...
});
```

然后在仓库的 Settings → Pages 里，把 Source 选成 **GitHub Actions**，并添加一个部署工作流（参考 [Astro 官方部署文档](https://docs.astro.build/zh-cn/guides/deploy/github/)）。也可以本地 `npm run build` 后把 `dist/` 手动推到 `gh-pages` 分支。

### Vercel / Netlify / Cloudflare Pages

直接连 Git 仓库即可，构建命令 `npm run build`，输出目录 `dist`。这三个平台都不用配 `base`。

## 目录结构

```
public/                  ★ 放图片资源
├── avatar.png               头像（同时用作顶部栏标识）
├── favicon.png              浏览器标签页图标
├── background.jpg           页面背景图
└── images/                  相册等自用图片放这里

src/
├── config/              ★ 你要改的就是这里
│   ├── site.config.ts       站点信息
│   ├── theme.config.ts      配色、背景与 Mica、圆角、动效
│   ├── profile.config.ts    个人信息
│   └── modules.config.ts    模块编排
├── lib/
│   └── m3.ts            Material You 色彩引擎（种子色 → 46 个颜色角色）
├── styles/
│   ├── global.css       M3 设计令牌、背景层、组件原语
│   └── animations.css   入场与装饰动效
├── components/
│   ├── ui/              基础组件：Icon、Card、Chip、SectionHeader
│   ├── layout/          TopBar、Footer
│   └── modules/         九个功能模块
├── layouts/
│   └── Shell.astro      页面外壳，注入配色变量、Mica 变量与主题脚本
└── pages/
    ├── index.astro      首页，按配置渲染模块
    └── 404.astro        404 页
```

## 设计说明

几个刻意的取舍，供二次开发时参考：

- **颜色全部走 CSS 变量**，所以组件里不需要写 `dark:` 变体，一套类名在明暗两种主题下自动成立。想加自己的颜色，加在 `global.css` 的 `@theme inline` 块里。
- **层级用表面色而不是阴影**。Material You 用 `surface-container-low` 到 `surface-container-highest` 五级色阶表达层次，阴影只作点缀，这是它和传统卡片设计最明显的区别。
- **入场动画只在 JS 可用时生效**（`.reveal` 前面挂了 `[data-js='on']`）。否则脚本一旦加载失败，`opacity: 0` 会让整页变成空白——这是很多模板都踩过的坑。
- **背景光斑用径向渐变而不是 `filter: blur()`**。大尺寸元素叠加模糊会让浏览器每帧重算，低端设备明显掉帧；多层色标的径向渐变观感几乎一致但几乎零成本。
- **卡片的 `backdrop-filter` 默认关掉**（`cardBlur: 0`）。背景图已经被模糊过一道，再给每张卡片叠一层背景模糊，视觉上几乎看不出差别，却让每张卡片各做一次合成——卡片一多就掉帧，实测还会导致部分内容绘制不出来。只有在把背景 `blur` 调得很小时这个值才有意义。
- **卡片里不嵌套 `<a>`**。项目卡片用「拉伸链接」：标题上的 `<a>` 用伪元素铺满整张卡，让整块可点，同时内部的其他链接靠 `z-index` 浮在上层。

## 许可

MIT，详见 [LICENSE](LICENSE)。
