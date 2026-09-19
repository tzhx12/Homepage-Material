// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // 部署前把 site 改成你的实际地址：
  //   - GitHub Pages 项目页 → 'https://<用户名>.github.io' + 打开下面的 base
  //   - GitHub Pages 用户页（仓库名为 <用户名>.github.io）→ 'https://<用户名>.github.io'
  //   - 自定义域名 → 'https://你的域名'
  site: 'https://tzhx12.github.io',

  // 部署到 GitHub Pages 的「项目页」时必须打开这一行，
  // 否则页面能打开但 CSS 和 JS 会全部 404。
  // 用户页和自定义域名不需要 base，保持注释即可。
  // base: '/Homepage-Material',

  vite: {
    plugins: [tailwindcss()],
  },
});
