/**
 * 主题配置 —— 配色、圆角、动效、背景。
 *
 * 最常用的一项就是 seedColor：换成任意一个十六进制颜色，
 * 整站所有颜色（按钮、卡片、文字、背景，浅色和深色两套）都会
 * 由它自动推导出来。这就是 Material You 的「动态取色」。
 */

export type ThemeMode = 'auto' | 'light' | 'dark';
export type RadiusScale = 'small' | 'medium' | 'large';

/**
 * 页面背景的三种形态：
 *   'image'  图片背景 + Mica 材质覆盖层（默认）
 *   'mesh'   纯 CSS 的柔和光斑，不需要任何图片
 *   'plain'  纯色，最省事也最快
 */
export type BackgroundMode = 'image' | 'mesh' | 'plain';

export const themeConfig = {
  /**
   * 种子色。整套配色由它推导。
   *
   * 一些参考值：
   *   '#8ECAE6'  天空蓝（当前）
   *   '#FF8FB1'  樱花粉
   *   '#B39DDB'  薰衣草紫
   *   '#FFB4A2'  蜜桃橘
   *   '#A8D8B9'  抹茶绿
   *   '#F4A6C0'  草莓奶昔
   *
   * 想从自己的图片取色：见 README「从图片取色」一节。
   */
  seedColor: '#8ECAE6',

  /** 首次访问时的主题。auto 表示跟随系统设置。 */
  defaultMode: 'auto' as ThemeMode,

  /** 右上角是否显示明暗切换按钮。 */
  showThemeSwitcher: true,

  /**
   * 圆角尺度。Material You 本身偏圆润，这里再提供三档：
   * small 含蓄 / medium 标准 / large 更圆更软萌
   */
  radius: 'large' as RadiusScale,

  /** 动效开关。关掉后所有过渡和入场动画都会停用（也自动尊重系统的「减少动态效果」）。 */
  motion: true,

  /** 卡片悬停时是否轻微上浮。 */
  hoverLift: true,

  /**
   * 页面背景。
   *
   * Mica 是 Windows 11 引入的材质：把壁纸做重度模糊，再叠一层跟随主题色的
   * 半透明覆盖层，让内容浮在「被磨砂过的墙纸」上。这里用纯 CSS 还原同样的层次：
   *
   *   背景图 → 模糊 → 覆盖层（surface 色 × overlayOpacity）→ 内容
   */
  background: {
    mode: 'image' as BackgroundMode,

    /**
     * 背景图。放在 public/ 目录下，用 '/文件名' 引用；也可以直接填网络地址。
     * 换图只需改这一行。想用自己图片的话，建议宽度 1600px 左右、控制在 500KB 以内。
     */
    image: '/background.jpg',

    /**
     * 背景图的模糊半径（px）。Mica 的关键就在这一步。
     * 调大 → 背景更朦胧、文字更清楚；调小 → 图片细节更明显。
     * 0 表示不模糊（图片本身很干净时才建议这么做）。
     */
    blur: 40,

    /**
     * 覆盖层不透明度，0 到 1。
     * 这是整张页面最影响可读性的一个值：
     *   0.95 左右  背景几乎只剩一层色调，最保守
     *   0.80 左右  能看出图片的构图和色彩，文字依然清楚（默认）
     *   0.6 以下   背景很抢眼，适合图片本身很柔和的情况
     */
    overlayOpacity: 0.8,

    /**
     * 卡片是否做成半透明。这是 Mica 观感的另一半——
     * 卡片透出一点背景，内容才像「浮在材质上」而不是贴在纯色块上。
     * 关掉后卡片恢复成不透明的纯色块。
     */
    translucentCards: true,

    /**
     * 卡片背后再模糊一次（px）。
     *
     * 默认 0，也就是关掉。原因：背景图本身已经被 blur 过一道，
     * 再给每张卡片叠一层 backdrop-filter，视觉上几乎看不出差别，
     * 却会让每张卡片各做一次合成——卡片一多就明显掉帧，
     * 部分环境下还会出现绘制不全的问题。
     *
     * 只有把上面的 blur 调得很小（比如 0~10）时，这个值才有意义。
     */
    cardBlur: 0,
  },
} as const;

/** 三档圆角对应的实际像素值，写进 CSS 变量供全局使用。 */
export const radiusTokens: Record<RadiusScale, Record<string, string>> = {
  small: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '20px',
    full: '999px',
  },
  medium: {
    xs: '6px',
    sm: '10px',
    md: '16px',
    lg: '22px',
    xl: '28px',
    full: '999px',
  },
  large: {
    xs: '8px',
    sm: '14px',
    md: '20px',
    lg: '28px',
    xl: '36px',
    full: '999px',
  },
};

export type ThemeConfig = typeof themeConfig;
