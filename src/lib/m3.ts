/**
 * Material You (Material Design 3) 色彩系统。
 *
 * 与 Android 12+ 的动态取色使用同一套 HCT 算法：给定一个种子色，
 * 推导出 primary / secondary / tertiary / neutral / neutralVariant / error
 * 六条色调板，再按 M3 官方的 tone 映射表铺到各个颜色角色上。
 *
 * 全部在构建时完成，产物是纯 CSS 变量，运行时零开销。
 */
import {
  argbFromHex,
  hexFromArgb,
  themeFromSourceColor,
} from '@material/material-color-utilities';

type PaletteKey =
  | 'primary'
  | 'secondary'
  | 'tertiary'
  | 'neutral'
  | 'neutralVariant'
  | 'error';

interface RoleSpec {
  palette: PaletteKey;
  tone: number;
}

/** M3 官方色调映射（浅色主题）。 */
const LIGHT_ROLES: Record<string, RoleSpec> = {
  primary: { palette: 'primary', tone: 40 },
  onPrimary: { palette: 'primary', tone: 100 },
  primaryContainer: { palette: 'primary', tone: 90 },
  onPrimaryContainer: { palette: 'primary', tone: 10 },

  secondary: { palette: 'secondary', tone: 40 },
  onSecondary: { palette: 'secondary', tone: 100 },
  secondaryContainer: { palette: 'secondary', tone: 90 },
  onSecondaryContainer: { palette: 'secondary', tone: 10 },

  tertiary: { palette: 'tertiary', tone: 40 },
  onTertiary: { palette: 'tertiary', tone: 100 },
  tertiaryContainer: { palette: 'tertiary', tone: 90 },
  onTertiaryContainer: { palette: 'tertiary', tone: 10 },

  error: { palette: 'error', tone: 40 },
  onError: { palette: 'error', tone: 100 },
  errorContainer: { palette: 'error', tone: 90 },
  onErrorContainer: { palette: 'error', tone: 10 },

  surface: { palette: 'neutral', tone: 98 },
  onSurface: { palette: 'neutral', tone: 10 },
  surfaceVariant: { palette: 'neutralVariant', tone: 90 },
  onSurfaceVariant: { palette: 'neutralVariant', tone: 30 },
  surfaceDim: { palette: 'neutral', tone: 87 },
  surfaceBright: { palette: 'neutral', tone: 98 },
  surfaceContainerLowest: { palette: 'neutral', tone: 100 },
  surfaceContainerLow: { palette: 'neutral', tone: 96 },
  surfaceContainer: { palette: 'neutral', tone: 94 },
  surfaceContainerHigh: { palette: 'neutral', tone: 92 },
  surfaceContainerHighest: { palette: 'neutral', tone: 90 },

  outline: { palette: 'neutralVariant', tone: 50 },
  outlineVariant: { palette: 'neutralVariant', tone: 80 },

  inverseSurface: { palette: 'neutral', tone: 20 },
  inverseOnSurface: { palette: 'neutral', tone: 95 },
  inversePrimary: { palette: 'primary', tone: 80 },

  scrim: { palette: 'neutral', tone: 0 },
  shadow: { palette: 'neutral', tone: 0 },
};

/**
 * 深色主题。fixed 系列在两种主题下色调一致，因此不在此覆盖，
 * 由 LIGHT_ROLES 兜底。
 */
const DARK_ROLES: Record<string, RoleSpec> = {
  primary: { palette: 'primary', tone: 80 },
  onPrimary: { palette: 'primary', tone: 20 },
  primaryContainer: { palette: 'primary', tone: 30 },
  onPrimaryContainer: { palette: 'primary', tone: 90 },

  secondary: { palette: 'secondary', tone: 80 },
  onSecondary: { palette: 'secondary', tone: 20 },
  secondaryContainer: { palette: 'secondary', tone: 30 },
  onSecondaryContainer: { palette: 'secondary', tone: 90 },

  tertiary: { palette: 'tertiary', tone: 80 },
  onTertiary: { palette: 'tertiary', tone: 20 },
  tertiaryContainer: { palette: 'tertiary', tone: 30 },
  onTertiaryContainer: { palette: 'tertiary', tone: 90 },

  error: { palette: 'error', tone: 80 },
  onError: { palette: 'error', tone: 20 },
  errorContainer: { palette: 'error', tone: 30 },
  onErrorContainer: { palette: 'error', tone: 90 },

  surface: { palette: 'neutral', tone: 6 },
  onSurface: { palette: 'neutral', tone: 90 },
  surfaceVariant: { palette: 'neutralVariant', tone: 30 },
  onSurfaceVariant: { palette: 'neutralVariant', tone: 80 },
  surfaceDim: { palette: 'neutral', tone: 6 },
  surfaceBright: { palette: 'neutral', tone: 24 },
  surfaceContainerLowest: { palette: 'neutral', tone: 4 },
  surfaceContainerLow: { palette: 'neutral', tone: 10 },
  surfaceContainer: { palette: 'neutral', tone: 12 },
  surfaceContainerHigh: { palette: 'neutral', tone: 17 },
  surfaceContainerHighest: { palette: 'neutral', tone: 22 },

  outline: { palette: 'neutralVariant', tone: 60 },
  outlineVariant: { palette: 'neutralVariant', tone: 30 },

  inverseSurface: { palette: 'neutral', tone: 90 },
  inverseOnSurface: { palette: 'neutral', tone: 20 },
  inversePrimary: { palette: 'primary', tone: 40 },
};

/** fixed 系列：两种主题下保持同一色调。 */
const FIXED_ROLES: Record<string, RoleSpec> = {
  primaryFixed: { palette: 'primary', tone: 90 },
  primaryFixedDim: { palette: 'primary', tone: 80 },
  onPrimaryFixed: { palette: 'primary', tone: 10 },
  onPrimaryFixedVariant: { palette: 'primary', tone: 30 },

  secondaryFixed: { palette: 'secondary', tone: 90 },
  secondaryFixedDim: { palette: 'secondary', tone: 80 },
  onSecondaryFixed: { palette: 'secondary', tone: 10 },
  onSecondaryFixedVariant: { palette: 'secondary', tone: 30 },

  tertiaryFixed: { palette: 'tertiary', tone: 90 },
  tertiaryFixedDim: { palette: 'tertiary', tone: 80 },
  onTertiaryFixed: { palette: 'tertiary', tone: 10 },
  onTertiaryFixedVariant: { palette: 'tertiary', tone: 30 },
};

export interface M3ThemeOptions {
  /** 种子色，任意合法十六进制颜色。整套配色由它推导。 */
  seedColor: string;
}

export interface M3Theme {
  /** 可供内联注入的完整 CSS 文本（含浅色/深色两套变量）。 */
  css: string;
  light: Record<string, string>;
  dark: Record<string, string>;
  seedColor: string;
}

const toKebab = (name: string) =>
  name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

/**
 * 由种子色生成整套 M3 设计令牌。
 *
 * 浅色变量挂在 :root；深色变量通过两个选择器生效——系统偏好深色且用户
 * 未手动指定浅色，或用户手动指定了深色。
 */
export function createM3Theme(options: M3ThemeOptions): M3Theme {
  const theme = themeFromSourceColor(argbFromHex(options.seedColor));
  const { palettes } = theme;

  const resolve = (spec: RoleSpec) =>
    hexFromArgb(palettes[spec.palette].tone(spec.tone));

  const allRoles: Record<string, RoleSpec> = { ...LIGHT_ROLES, ...FIXED_ROLES };

  const light: Record<string, string> = {};
  const dark: Record<string, string> = {};

  for (const [role, spec] of Object.entries(allRoles)) {
    light[role] = resolve(spec);
    dark[role] = resolve(DARK_ROLES[role] ?? spec);
  }

  const declarations = (values: Record<string, string>) =>
    Object.entries(values)
      .map(([role, hex]) => `  --md-sys-color-${toKebab(role)}: ${hex};`)
      .join('\n');

  const css = `/* 由 theme.config.ts 的 seedColor 自动生成，请勿手动编辑 */
:root {
${declarations(light)}
}

@media (prefers-color-scheme: dark) {
  :root:not([data-theme='light']) {
${declarations(dark)}
  }
}

:root[data-theme='dark'] {
${declarations(dark)}
}
`;

  return { css, light, dark, seedColor: options.seedColor };
}
