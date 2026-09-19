/**
 * 主题配置 —— 配色、圆角、动效。
 *
 * 最常用的一项就是 seedColor：换成任意一个十六进制颜色，
 * 整站所有颜色（按钮、卡片、文字、背景，浅色和深色两套）都会
 * 由它自动推导出来。这就是 Material You 的「动态取色」。
 */

export type ThemeMode = 'auto' | 'light' | 'dark';
export type RadiusScale = 'small' | 'medium' | 'large';

export const themeConfig = {
  /**
   * 种子色。整套配色由它推导。
   *
   * 一些适合可爱 / 二次元风格的参考值：
   *   '#FF8FB1'  樱花粉（默认）
   *   '#B39DDB'  薰衣草紫
   *   '#8ECAE6'  天空蓝
   *   '#FFB4A2'  蜜桃橘
   *   '#A8D8B9'  抹茶绿
   *   '#F4A6C0'  草莓奶昔
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

  /**
   * 背景光斑。在页面背景铺一层柔和的渐变色块，
   * 是「可爱风」的主要来源之一。关掉会变成纯色背景。
   */
  backgroundMesh: true,

  /** 动效开关。关掉后所有过渡和入场动画都会停用（也自动尊重系统的「减少动态效果」）。 */
  motion: true,

  /** 卡片悬停时是否轻微上浮。 */
  hoverLift: true,
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
