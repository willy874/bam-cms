import { DesignToken, CssObject } from '@/cssinjs';
import { merge } from './libs';
import { keyOf, fromNumberArray } from './utils';

function getRowStyle(token: DesignToken) {
  const { media } = token;
  return keyOf(media).reduce<CssObject>((acc, device) => {
    const deviceSize = media[device];
    const deviceClass = deviceSize ? `-${device}` : '';
    const cssProperties = {
      [`.d${deviceClass}-block`]: {
        display: 'block',
      },
      [`.d${deviceClass}-inline-block`]: {
        display: 'inline-block',
      },
      [`.d${deviceClass}-none`]: {
        display: 'none',
      },
      [`.d${deviceClass}-flex`]: {
        display: 'flex',
      },
      [`.d${deviceClass}-inline-flex`]: {
        display: 'inline-flex',
      },
      [`.d${deviceClass}-black`]: {
        display: 'flex',
      },
      [`.flex${deviceClass}-wrap`]: {
        flexWrap: 'wrap',
      },
      [`.flex${deviceClass}-nowrap`]: {
        flexWrap: 'nowrap',
      },
      [`.flex${deviceClass}-column`]: {
        flexDirection: 'column',
      },
      [`.flex${deviceClass}-row`]: {
        flexDirection: 'row',
      },
      [`.align${deviceClass}-center`]: {
        alignItems: 'center',
      },
      [`.align${deviceClass}-start`]: {
        alignItems: 'flex-start',
      },
      [`.align${deviceClass}-end`]: {
        alignItems: 'flex-end',
      },
      [`.justify${deviceClass}-center`]: {
        justifyContent: 'center',
      },
      [`.justify${deviceClass}-start`]: {
        justifyContent: 'flex-start',
      },
      [`.justify${deviceClass}-end`]: {
        justifyContent: 'flex-end',
      },
      [`.justify${deviceClass}-around`]: {
        justifyContent: 'space-around',
      },
      [`.justify${deviceClass}-between`]: {
        justifyContent: 'space-between',
      },
      [`.justify${deviceClass}-evenly`]: {
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
  return keyOf(media).reduce<CssObject>((acc, device) => {
    const deviceSize = media[device];
    const deviceClass = deviceSize ? `-${device}` : '';
    const cssProperties = fromNumberArray(column).reduce<CssObject>((acc, i) => {
      if (i === 0) {
        return {
          ...acc,
          [`.self${deviceClass}-center`]: {
            alignSelf: 'center',
          },
          [`.self${deviceClass}-start`]: {
            alignSelf: 'self-start',
          },
          [`.self${deviceClass}-end`]: {
            alignSelf: 'self-end',
          },
        };
      } else {
        const width = (i / column) * 100;
        return {
          ...acc,
          [`.col${deviceClass}-${i}`]: {
            flexBasis: `${width}%`,
            maxWidth: `${width}%`,
          },
          [`.grow${deviceClass}-${i}`]: {
            flexGrow: i,
          },
          [`.shrink${deviceClass}-${i}`]: {
            flexShrink: i,
          },
          [`.order${deviceClass}-${i}`]: {
            order: i,
          },
          [`.offset${deviceClass}-${i}`]: {
            marginLeft: `${width}%`,
          },
          [`.push${deviceClass}-${i}`]: {
            insetInlineStart: `${width}%`,
          },
          [`.pull${deviceClass}-${i}`]: {
            insetInlineEnd: `${width}%`,
          },
        };
      }
    }, {});
    if (deviceSize) {
      return { ...acc, [`@media (min-width: ${deviceSize}px)`]: cssProperties };
    } else {
      return { ...acc, ...cssProperties };
    }
  }, {});
}

export function getStyle(token: DesignToken) {
  const rowStyle = getRowStyle(token);
  const colStyle = getColStyle(token);
  const baseStyle = {
    '.bam-flex': {
      display: 'flex',
    },
  };
  return merge(baseStyle, rowStyle, colStyle);
}
