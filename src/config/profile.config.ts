/**
 * 个人信息配置 —— 身份、头像、社交链接。
 *
 * 这些内容会被顶部栏、SEO 元信息、页脚和「个人名片」模块共同使用。
 */

/** 社交链接的图标类型。除内置图标外，也可以用 emoji 或自定义图片。 */
export type SocialIcon =
  | 'github'
  | 'mail'
  | 'x'
  | 'bilibili'
  | 'telegram'
  | 'discord'
  | 'steam'
  | 'youtube'
  | 'zhihu'
  | 'qq'
  | 'rss'
  | 'link';

export interface SocialLink {
  /** 内置图标名，或任意 emoji，或图片 URL。 */
  icon: SocialIcon | string;
  /** 鼠标悬停时显示的名称。 */
  label: string;
  /** 点击跳转的地址。支持 mailto: 和 https:// */
  href: string;
  /** 可选的强调色。填 'primary' / 'secondary' / 'tertiary' 之一，
   *  不填则统一使用预设配色。 */
  accent?: 'primary' | 'secondary' | 'tertiary';
}

export const profileConfig = {
  /** 显示名称。 */
  name: 'tzhx12',

  /**
   * 头像。三种写法：
   *   '/avatar.svg'                  放 public/ 目录下的图片
   *   'https://...'                  网络图片
   *   '🐣'                           直接用 emoji 当头像
   */
  avatar: '/avatar.svg',

  /** 一句话签名，显示在名字下方。 */
  tagline: '写点代码，做点喜欢的东西。',

  /**
   * 自我介绍。支持换行；用 \n\n 分段。
   * 不需要的话留空字符串即可。
   */
  bio: '前端爱好者，喜欢 Material You 和一切圆润好看的东西。\n正在学着把想法做成能跑起来的东西。',

  /** 状态徽章。留空则不显示。 */
  status: '学习中',

  /** 位置信息。留空则不显示。 */
  location: '中国',

  /** 社交链接。删掉不需要的，或按同样格式添加。 */
  socials: [
    {
      icon: 'github',
      label: 'GitHub',
      href: 'https://github.com/tzhx12',
      accent: 'primary',
    },
    {
      icon: 'mail',
      label: 'Email',
      href: 'mailto:122715481+tzhx12@users.noreply.github.com',
      accent: 'tertiary',
    },
  ] as SocialLink[],
} as const;

export type ProfileConfig = typeof profileConfig;
