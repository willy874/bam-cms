import React from 'react';
import cn from 'classnames';
import { GridProps } from './types';
import { useStyle } from '@/cssinjs/src';
import { getGridStyle } from './style';

const Grid: React.ForwardRefRenderFunction<HTMLDivElement, GridProps> = function (props, ref) {
  const { classNames, children, ...attrs } = props;
  const gridClassNames = {};
  useStyle('Grid', getGridStyle);
  return (
    <div className={cn(gridClassNames, classNames)} ref={ref} {...attrs}>
      {children}
    </div>
  );
};

type GridComponent = (props: Omit<GridProps, 'ref'> & { ref?: React.Ref<HTMLDivElement> }) => JSX.Element;

export default React.memo(React.forwardRef(Grid)) as GridComponent;
