// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// 部署前把 site 改成你的实际地址：
//   - GitHub Pages 项目页 → 'https://<用户名>.github.io/<仓库名>'
//   - GitHub Pages 用户页（仓库名为 <用户名>.github.io）→ 'https://<用户名>.github.io'
//   - 自定义域名 → 'https://你的域名'
export default defineConfig({
  site: 'https://tzhx12.github.io',
  vite: {
    plugins: [tailwindcss()],
  },
});
