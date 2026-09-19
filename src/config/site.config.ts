/**
 * 站点配置 —— 标题、描述、SEO。
 */

export const siteConfig = {
  /** 浏览器标签页标题，也会用于页脚版权信息和顶部栏。 */
  title: 'tzhx12 的小站',

  /** 站点副标题。留空则不显示。 */
  subtitle: '写点代码，做点喜欢的东西',

  /** 用于搜索引擎和社交分享的描述。 */
  description: 'Material You 风格的个人主页，记录我自己、我的项目和喜欢的东西。',

  /** 页面语言，影响字体选择和屏幕阅读器。'zh-CN' / 'en' / 'ja' 等。 */
  lang: 'zh-CN',

  /** SEO 关键词。 */
  keywords: ['个人主页', 'Material You', 'Astro'],

  /**
   * 站点图标（浏览器标签页上的小图）。
   * 默认指向 GitHub 头像，**换成你自己的就把用户名替换掉**。
   *
   * 也支持：
   *   '/favicon.png'   用 public/ 下的图片（建议 64×64 以内）
   *   '🌸'             直接用 emoji，会被转成内联 SVG
   */
  favicon: 'https://github.com/tzhx12.png?size=64',

  /** 页脚版权信息里的署名。 */
  copyright: 'tzhx12',

  /** 页脚起始年份，用于显示 "2026 - 2026" 这样的年份区间。 */
  since: 2026,

  /** 是否在页脚显示「由 Astro 驱动」的标识。 */
  showPoweredBy: true,
} as const;

export type SiteConfig = typeof siteConfig;
