/**
 * 模块配置 —— 这个文件的数组顺序就是页面上模块的显示顺序。
 *
 * ┌─ 怎么用 ────────────────────────────────────────────────┐
 * │ 添加模块：复制一个现成的块，改 type 和内容即可          │
 * │ 删掉模块：整块注释掉或删除                              │
 * │ 调整顺序：把整块上下移动                                │
 * │ 临时隐藏：把 enabled 改成 false（不用删内容）           │
 * └─────────────────────────────────────────────────────────┘
 *
 * 每个模块都可选这些通用字段：
 *   enabled  是否显示，默认 true
 *   title    模块标题文字
 *   icon     标题前的图标（emoji 或内置图标名）
 *   width    'half' 占半栏（默认），'full' 占满整行
 *   hint     标题右侧的小字说明
 */

/* ============================================================
 * 内容项的类型定义
 * ========================================================== */

export interface LinkItem {
  /** 内置图标名（github / mail / bilibili …）、emoji，或图片 URL。 */
  icon: string;
  label: string;
  description?: string;
  href: string;
  /**
   * 可选的强调色覆盖。默认不填 —— 全站共用 theme.config.ts 里
   * accentRole 指定的同一个角色，保证同类元素颜色一致。
   * 只有在确实要单独强调某个条目时才填。
   */
  accent?: 'primary' | 'secondary' | 'tertiary';
}

export interface ProjectItem {
  name: string;
  description: string;
  /** 点击卡片跳转的地址，一般是线上演示。 */
  href?: string;
  /** 源码仓库地址，会在卡片上额外显示一个入口。 */
  repo?: string;
  /** 图标：emoji 或图片 URL。 */
  icon?: string;
  /** 技术栈标签。 */
  tags?: string[];
  /** 项目状态徽章，如 '进行中' / '已完成'。 */
  status?: string;
  /** 标记为精选，卡片会用强调色填充。 */
  featured?: boolean;
}

export interface SkillItem {
  name: string;
  /** 熟练度 1-5，不填则不显示进度点。 */
  level?: number;
  icon?: string;
}

export interface SkillGroup {
  /** 分组名称，如「前端」「工具」。 */
  category: string;
  items: SkillItem[];
}

export interface TimelineItem {
  /** 时间文字，如 '2024.09' 或 '2024 年秋天'。 */
  date: string;
  title: string;
  description?: string;
  icon?: string;
  tags?: string[];
  href?: string;
}

export interface FriendItem {
  name: string;
  avatar: string;
  description?: string;
  href: string;
  /** 可选的强调色覆盖，默认跟随 theme.config.ts 的 accentRole。 */
  accent?: 'primary' | 'secondary' | 'tertiary';
}

export interface StatItem {
  label: string;
  value: string;
  /** 数值后缀，如 '+' '个' '小时'。 */
  suffix?: string;
  icon?: string;
  /** 可选的强调色覆盖，默认跟随 theme.config.ts 的 accentRole。 */
  accent?: 'primary' | 'secondary' | 'tertiary';
}

export interface NoteItem {
  content: string;
  date?: string;
  /** 可选的强调色覆盖，默认跟随 theme.config.ts 的 accentRole。 */
  accent?: 'primary' | 'secondary' | 'tertiary';
}

export interface GalleryItem {
  /** 图片地址：public/ 下的路径或网络 URL。 */
  src: string;
  alt: string;
  caption?: string;
  href?: string;
}

/* ============================================================
 * 模块配置的类型定义
 * ========================================================== */

interface BaseModule {
  enabled?: boolean;
  title?: string;
  icon?: string;
  width?: 'half' | 'full';
  hint?: string;
}

export type ModuleConfig =
  /** 个人名片。内容取自 profile.config.ts，这里只控制显示方式。 */
  | (BaseModule & {
      type: 'profile';
      /** 是否显示简介段落。 */
      showBio?: boolean;
      /** 是否显示位置和状态。 */
      showMeta?: boolean;
    })
  /** 常用链接或社交入口。 */
  | (BaseModule & { type: 'links'; items: LinkItem[] })
  /** 项目展示。 */
  | (BaseModule & { type: 'projects'; items: ProjectItem[] })
  /** 技能标签，支持分组。 */
  | (BaseModule & { type: 'skills'; groups: SkillGroup[] })
  /** 经历时间线。 */
  | (BaseModule & { type: 'timeline'; items: TimelineItem[] })
  /** 友链。 */
  | (BaseModule & { type: 'friends'; items: FriendItem[] })
  /** 数据统计，一排数字。 */
  | (BaseModule & { type: 'stats'; items: StatItem[] })
  /** 便签，用来放短句或公告。 */
  | (BaseModule & { type: 'notes'; items: NoteItem[] })
  /** 图片墙。 */
  | (BaseModule & { type: 'gallery'; items: GalleryItem[]; columns?: 2 | 3 });

/* ============================================================
 * 页面模块 —— 按需增删改
 * ========================================================== */

export const modules: ModuleConfig[] = [
  {
    type: 'profile',
    width: 'full',
    showBio: true,
    showMeta: true,
  },

  {
    type: 'links',
    title: '联系方式',
    hint: '这些地方都能找到我',
    width: 'half',
    items: [
      {
        icon: 'github',
        label: 'GitHub',
        description: '@tzhx12',
        href: 'https://github.com/tzhx12',
      },
      {
        icon: 'mail',
        label: 'Email',
        description: '随时来信',
        href: 'mailto:122715481+tzhx12@users.noreply.github.com',
      },
      {
        icon: 'link',
        label: '简历',
        description: '我的经历',
        href: '#',
      },
    ],
  },

  {
    type: 'stats',
    title: '数据统计',
    width: 'half',
    items: [
      { label: '公开仓库', value: '2', suffix: '个' },
      { label: '写过的代码', value: '∞' },
      { label: '入坑年数', value: '1', suffix: '年' },
    ],
  },

  {
    type: 'projects',
    title: '我的项目',
    hint: '做出来给世界看的东西',
    width: 'full',
    items: [
      {
        name: '个人主页',
        description:
          '就是你正在看的这个页面。Material You 配色由单个种子色推导，模块通过配置文件自由编排。',
        href: 'https://github.com/tzhx12/Homepage-Material',
        repo: 'https://github.com/tzhx12/Homepage-Material',
        tags: ['Astro', 'Tailwind CSS', 'Material You'],
        status: '进行中',
        featured: true,
      },
      {
        name: '下一个项目',
        description:
          '这里还空着，等一个想做的点子。把 modules.config.ts 里这段换成你自己的项目就行。',
        tags: ['待添加'],
      },
    ],
  },

  {
    type: 'skills',
    title: '技能',
    width: 'half',
    groups: [
      {
        category: '开发',
        items: [
          { name: 'HTML / CSS', level: 4 },
          { name: 'JavaScript', level: 3 },
          { name: 'Git', level: 3 },
          { name: 'Python', level: 2 },
        ],
      },
      {
        category: '在学',
        items: [
          { name: 'TypeScript', level: 2 },
          { name: 'Astro', level: 2 },
        ],
      },
    ],
  },

  {
    type: 'timeline',
    title: '我的经历',
    width: 'half',
    items: [
      {
        date: '2026.09',
        title: '建了第一个 GitHub 仓库',
        description: '从这里开始。',
      },
      {
        date: '未来',
        title: '做更多喜欢的东西',
        description: '这一段留给你自己填。',
      },
    ],
  },

  {
    type: 'notes',
    title: '随笔',
    width: 'half',
    items: [
      {
        content: '把喜欢的事情一件件做出来，就已经很厉害了。',
        date: '2026.09',
      },
    ],
  },

  {
    type: 'friends',
    title: '友链',
    hint: '有趣的灵魂',
    width: 'half',
    items: [
      {
        name: '你的朋友',
        avatar: '/images/illustration-03.jpg',
        description: '把这里换成朋友的站点',
        href: '#',
      },
    ],
  },

  {
    type: 'gallery',
    title: '相册',
    hint: '图片放在 public/images/ 目录下',
    width: 'full',
    columns: 3,
    items: [
      {
        src: '/images/illustration-01.jpg',
        alt: '插画',
        caption: '角色插画',
      },
      {
        src: '/images/illustration-02.jpg',
        alt: '插画',
        caption: '樱花与远山',
      },
      {
        src: '/images/illustration-03.jpg',
        alt: '插画',
        caption: '晴空',
      },
    ],
  },
];

export default modules;
