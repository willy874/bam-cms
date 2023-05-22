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

export function cssStringify(css: Record<string, string | Record<string, string>>) {
  const cssArr: string[] = [];
  Object.entries(css).forEach(([key, value]) => {
    if (typeof value === 'string') {
      cssArr.push(`${key} { ${value} }`);
    } else {
      const valueArr: string[] = [];
      Object.entries(value).forEach(([k, v]) => {
        valueArr.push(`${k}: ${v}`);
      });
      cssArr.push(`${key} { ${valueArr.join('; ')} }`);
    }
  });
  return cssArr.join('\n');
}
