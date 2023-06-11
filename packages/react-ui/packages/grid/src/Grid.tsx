import React from 'react';
import cn from 'classnames';
import { BaseGridProps, GridProps } from './types';
import { useStyle } from '@/cssinjs';
import { getGridStyle } from './style';
import { isNotNull, keyOf, omit } from './utils';

const resolveGrid = (props?: Partial<BaseGridProps>): BaseGridProps | null => {
  if (!props) {
    return null;
  }
  const { display, span, offset, order, grow, shrink, direction, wrap } = props;
  return {
    display,
    span,
    offset,
    order,
    grow,
    shrink,
    direction,
    wrap,
  };
};

const Grid: React.ForwardRefRenderFunction<HTMLDivElement, GridProps> = function (props, ref) {
  const { classNames, children, xs, sm, md, lg, xl, xxl, ...$attrs } = props;
  const attrs = omit($attrs, ['display', 'span', 'offset', 'order', 'grow', 'shrink', 'direction', 'wrap']);
  const media = {
    default: resolveGrid(props),
    xs: resolveGrid(xs),
    sm: resolveGrid(sm),
    md: resolveGrid(md),
    lg: resolveGrid(lg),
    xl: resolveGrid(xl),
    xxl: resolveGrid(xxl),
  };
  const gridClassNames = keyOf(media).reduce<Set<string>>((acc, key) => {
    const { display, span, offset, order, grow, shrink, direction, wrap, align, justify } = media[key] || {};
    const device = key === 'default' ? '' : `-${key}`;
    if (isNotNull(display)) {
      acc.add(`d${device}-${display}`);
    }
    if (isNotNull(span)) {
      acc.add(`col${device}-${span}`);
    }
    if (isNotNull(offset)) {
      acc.add(`offset${device}-${offset}`);
    }
    if (isNotNull(order)) {
      acc.add(`order${device}-${order}`);
    }
    if (isNotNull(grow)) {
      acc.add(`grow${device}-${grow}`);
    }
    if (isNotNull(shrink)) {
      acc.add(`shrink${device}-${shrink}`);
    }
    if (isNotNull(direction)) {
      acc.add(`flex${device}-${direction}`);
    }
    if (isNotNull(wrap)) {
      acc.add(`flex${device}-${wrap}`);
    }
    if (isNotNull(justify)) {
      acc.add(`justify${device}-${justify}`);
    }
    if (isNotNull(align)) {
      acc.add(`align${device}-${align}`);
    }
    return acc;
  }, new Set());
  useStyle('Grid', getGridStyle);
  return (
    <div className={cn('bam-grid', ...gridClassNames, classNames)} ref={ref} {...attrs}>
      {children}
    </div>
  );
};

type GridComponent = (props: Omit<GridProps, 'ref'> & { ref?: React.Ref<HTMLDivElement> }) => JSX.Element;

export default React.memo(React.forwardRef(Grid)) as GridComponent;
