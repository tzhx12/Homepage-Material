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
  /**
   * 可选的强调色覆盖。默认不填 —— 全站共用 theme.config.ts 里
   * accentRole 指定的同一个角色，保证同类元素颜色一致。
   */
  accent?: 'primary' | 'secondary' | 'tertiary';
}

export const profileConfig = {
  /** 显示名称。 */
  name: 'tzhx12',

  /**
   * 头像。顶部栏也会拿它当站点标识，所以换这一处就够了。
   *
   * 默认直接引用 GitHub 头像，仓库里不存任何图片文件。
   * **换成你自己的：把下面的用户名替换掉即可**
   *   https://github.com/<你的用户名>.png
   *
   * 三种写法都支持：
   *   'https://github.com/你的用户名.png'  GitHub 头像，换头像时自动跟着变
   *   '/自己的图片.png'                    放进 public/ 目录，不依赖外部服务
   *   '🐣'                                 直接用 emoji
   *
   * 注：上面的地址会 302 跳到 avatars.githubusercontent.com。
   * 如果访问者所在网络连不上 github.com（国内偶尔会有），头像会加载失败。
   * 那种情况下改用头像 CDN 的直链更稳，它不经过 github.com：
   *   https://avatars.githubusercontent.com/u/你的数字ID?v=4
   * （数字 ID 在 https://api.github.com/users/你的用户名 里的 id 字段）
   */
  avatar: 'https://github.com/tzhx12.png?size=240',

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
    },
    {
      icon: 'mail',
      label: 'Email',
      href: 'mailto:122715481+tzhx12@users.noreply.github.com',
    },
  ] as SocialLink[],
} as const;

export type ProfileConfig = typeof profileConfig;
