import { kebabCase } from '../libs';

export function cssParse(css: string) {
  const cssText = css.replace(/\/\*[\s\S]*?\*\/|([^\\:]|^)\/\/.*$/gm, '');
  const cssObj: Record<string, Record<string, string>> = {};
  const reg = /([^{}]+)\{([^{}]+)\}/g;
  let match: RegExpExecArray | null;
  while ((match = reg.exec(cssText))) {
    const key = match[1].trim();
    const value = match[2].trim();
    cssObj[key] = {};
    value.split(';').forEach((item) => {
      const [k, v] = item.split(':');
      cssObj[key][k.trim()] = v.trim();
    });
  }
  return cssObj;
}

export type CssObject =
  | React.CSSProperties
  | Record<string, string | React.CSSProperties>
  | { [key: `@${string}`]: CssObject };

export type CSSInterpolation = CssObject | string | null | undefined;

export function cssStringify(css: CSSInterpolation) {
  const cssArr: string[] = [];
  if (!css) {
    return '';
  }
  if (typeof css === 'string') {
    return css;
  }
  Object.entries(css).forEach(([key, value]) => {
    if (key[0] === '@') {
      cssArr.push(`${key} {\n${cssStringify(value)}\n}`);
      return;
    }
    if (typeof value === 'string') {
      cssArr.push(`${key} {\n${value}\n}`);
    } else {
      const valueArr: string[] = [];
      Object.entries(value).forEach(([k, v]) => {
        valueArr.push(`${kebabCase(k)}: ${v}`);
      });
      cssArr.push(`${key} { ${valueArr.join(';\n ')} }`);
    }
  });
  return cssArr.join('\n');
}
