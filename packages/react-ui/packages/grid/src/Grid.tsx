import React from 'react';
import cn from 'classnames';
import { BaseFlexProps, FlexProps } from './types';
import { useStyle } from '@/cssinjs';
import { getStyle } from './style';
import { isNotNull, keyOf, omit } from './utils';

const resolveFlex = (props?: Partial<BaseFlexProps>): BaseFlexProps | null => {
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

const Flex: React.ForwardRefRenderFunction<HTMLDivElement, FlexProps> = function (props, ref) {
  const { classNames, children, xs, sm, md, lg, xl, xxl, ...$attrs } = props;
  const attrs = omit($attrs, ['display', 'span', 'offset', 'order', 'grow', 'shrink', 'direction', 'wrap']);
  const media = {
    default: resolveFlex(props),
    xs: resolveFlex(xs),
    sm: resolveFlex(sm),
    md: resolveFlex(md),
    lg: resolveFlex(lg),
    xl: resolveFlex(xl),
    xxl: resolveFlex(xxl),
  };
  const FlexClassNames = keyOf(media).reduce<Set<string>>((acc, key) => {
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
  useStyle('Flex', getStyle);
  return (
    <div className={cn('bam-flex', ...FlexClassNames, classNames)} ref={ref} {...attrs}>
      {children}
    </div>
  );
};

type FlexComponent = (props: Omit<FlexProps, 'ref'> & { ref?: React.Ref<HTMLDivElement> }) => JSX.Element;

export default React.memo(React.forwardRef(Flex)) as FlexComponent;
