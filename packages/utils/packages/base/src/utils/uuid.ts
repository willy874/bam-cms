export function uuid(hash?: string) {
  const g = globalThis || window;
  if (typeof g.crypto === 'object' && 'randomUUID' in g.crypto && !hash) {
    return g.crypto.randomUUID();
  }
  if (!hash) hash = '0123456789abcdefg';
  let uuid = '';
  const hashArr = hash.split('');
  for (let i = 1; i <= 36; i++) {
    if (i === 9 || i === 14 || i === 19 || i === 24) {
      uuid += '-';
    } else if (i === 15) {
      uuid += 4;
    } else if (i === 20) {
      uuid += hashArr[(Math.random() * 4) | 8];
    } else {
      uuid += hashArr[(Math.random() * 16) | 0];
    }
  }
  return uuid;
}
