/**
 * 强调色角色。
 *
 * Material You 的基本规则之一：**同一类元素用同一个颜色角色**。
 * 一排图标不能各用各的容器色，否则视觉上就不像同一套系统生成的了。
 *
 * 所以这里把角色集中定义一次，全站共用；默认角色由
 * theme.config.ts 的 accentRole 决定，改一处就全站统一变。
 *
 * 单个条目仍可用 accent 字段覆盖（见 modules.config.ts），
 * 用于确实需要单独强调的情况。
 */
import { themeConfig, type AccentRole } from '../config/theme.config';

export type { AccentRole };

/**
 * 容器色：用于图标底色、便签底色这类「色块 + 其上文字」的组合。
 * 必须成对使用 —— 前景色和背景色是配套的，拆开会导致对比度不足。
 */
export const ACCENT_CONTAINER: Record<AccentRole, string> = {
  primary: 'bg-primary-container text-on-primary-container',
  secondary: 'bg-secondary-container text-on-secondary-container',
  tertiary: 'bg-tertiary-container text-on-tertiary-container',
};

/** 纯色前景：用于数字、强调文字这类直接落在表面色上的元素。 */
export const ACCENT_TEXT: Record<AccentRole, string> = {
  primary: 'text-primary',
  secondary: 'text-secondary',
  tertiary: 'text-tertiary',
};

/** 容器色的内联样式版本，供需要动态拼接的场合使用。 */
export const ACCENT_CONTAINER_VARS: Record<AccentRole, string> = {
  primary:
    'background-color:var(--md-sys-color-primary-container);color:var(--md-sys-color-on-primary-container)',
  secondary:
    'background-color:var(--md-sys-color-secondary-container);color:var(--md-sys-color-on-secondary-container)',
  tertiary:
    'background-color:var(--md-sys-color-tertiary-container);color:var(--md-sys-color-on-tertiary-container)',
};

/** 全站默认角色。改 theme.config.ts 的 accentRole 即可整体切换。 */
export const defaultAccent: AccentRole = themeConfig.accentRole;

/** 取某个条目实际使用的角色：优先用它自己的 accent，否则用全站默认。 */
export const resolveAccent = (accent?: AccentRole): AccentRole =>
  accent ?? defaultAccent;
