/**
 * 图片来源的识别。
 *
 * 所有接受图片的配置项都走这里，保证判断逻辑完全一致。此前这段判断
 * 散落在六个组件里各写一遍，很容易改漏——favicon 就出过这个问题：
 * 补了网址支持却漏了另一处，填网址会被当成 emoji。
 *
 * 统一的写法：
 *   '/images/photo.jpg'                public/ 下的本地图片
 *   'https://example.com/photo.jpg'    网络地址
 *   'data:image/png;base64,...'        内联图片
 *
 * 剩下的一律按「不是图片」处理，由调用方决定怎么兜底
 * ——图标名、emoji 都属于这一类。
 */

const IMAGE_URL = /^(https?:\/\/|\/\/|\/|data:image\/)/i;

/**
 * 这个值是不是图片地址。
 *
 * 注意它会接受任意 http(s) 地址，不做域名校验：图片是由访问者的浏览器
 * 直接去取的，用哪个图床是你的选择，这里不该替你做决定。
 */
export function isImageSource(value: string | undefined | null): boolean {
  if (!value) return false;
  return IMAGE_URL.test(value.trim());
}

/**
 * 把图片地址转成 CSS 里可用的 url() 值，顺便挡掉会破坏样式表的字符。
 *
 * 用于背景图这类要拼进 CSS 的场合：地址里的引号或换行会让整条规则失效，
 * 所以统一用引号包裹并对引号做转义。
 */
export function toCssUrl(value: string): string {
  const escaped = value.trim().replace(/\\/g, '\\\\').replace(/'/g, "\\'");
  return `url('${escaped}')`;
}
