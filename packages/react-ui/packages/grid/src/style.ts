import { DesignToken, CssObject } from '@/cssinjs';
import { merge } from './libs';

function keyOf<T extends Record<string, unknown>>(value: T): (keyof T)[] {
  return Object.keys(value) as (keyof T)[];
}
function toNumberArray(value: number): number[] {
  return Array.from({ length: value }, (_, index) => index);
}

function getRowStyle(token: DesignToken) {
  const { media } = token;
  return keyOf(media).reduce<CssObject>((acc, device) => {
    const deviceSize = media[device];
    const cssProperties = {
      [`.flex-${device}-wrap`]: {
        flexWrap: 'wrap',
      },
      [`.flex-${device}-nowrap`]: {
        flexWrap: 'nowrap',
      },
      [`.flex-${device}-column`]: {
        flexDirection: 'column',
      },
      [`.flex-${device}-row`]: {
        flexDirection: 'row',
      },
      [`.align-${device}-center`]: {
        alignItems: 'center',
      },
      [`.align-${device}-start`]: {
        alignItems: 'flex-start',
      },
      [`.align-${device}-end`]: {
        alignItems: 'flex-end',
      },
      [`.justify-${device}-center`]: {
        justifyContent: 'center',
      },
      [`.justify-${device}-start`]: {
        justifyContent: 'flex-start',
      },
      [`.justify-${device}-end`]: {
        justifyContent: 'flex-end',
      },
      [`.justify-${device}-around`]: {
        justifyContent: 'space-around',
      },
      [`.justify-${device}-between`]: {
        justifyContent: 'space-between',
      },
      [`.justify-${device}-evenly`]: {
        justifyContent: 'space-evenly',
      },
    };
    if (deviceSize) {
      return { ...acc, [`@media (min-width: ${deviceSize}px)`]: cssProperties };
    } else {
      return { ...acc, ...cssProperties };
    }
  }, {});
}

function getColStyle(token: DesignToken) {
  const { column, media } = token;
  return toNumberArray(column).reduce<CssObject>((acc, i) => {
    if (i === 0) {
      const colBaseStyle = keyOf(media).reduce<CssObject>((acc, device) => {
        const deviceSize = media[device];
        const cssProperties = {
          [`.self-${device}-center`]: {
            alignSelf: 'center',
          },
          [`.self-${device}-start`]: {
            alignSelf: 'self-start',
          },
          [`.self-${device}-end`]: {
            alignSelf: 'self-end',
          },
        };
        if (deviceSize) {
          return { ...acc, [`@media (min-width: ${deviceSize}px)`]: cssProperties };
        } else {
          return { ...acc, ...cssProperties };
        }
      }, {});
      return { ...acc, ...colBaseStyle };
    } else {
      const width = (i / column) * 100;
      const cssProperties = {
        [`.col-${i}`]: {
          flexBasis: `${width}%`,
          maxWidth: `${width}%`,
        },
        [`.grow-${i}`]: {
          flexGrow: i,
        },
        [`.shrink-${i}`]: {
          flexShrink: i,
        },
        [`.order-${i}`]: {
          order: i,
        },
        [`.offset-${i}`]: {
          marginLeft: `${width}%`,
        },
        [`.push-${i}`]: {
          insetInlineStart: `${width}%`,
        },
        [`.pull-${i}`]: {
          insetInlineEnd: `${width}%`,
        },
      };
      return { ...acc, ...cssProperties };
    }
  }, {});
}

export function getGridStyle(token: DesignToken) {
  const rowStyle = getRowStyle(token);
  const colStyle = getColStyle(token);
  return merge(rowStyle, colStyle);
}
