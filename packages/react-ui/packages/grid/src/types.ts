import { MediaType } from '@/cssinjs';

export type BaseProps<T = HTMLDivElement> = React.HTMLAttributes<T> & {
  classNames?: string | string[] | Record<string, boolean>;
};

export interface BaseGridProps {
  span?: number;
  offset?: React.CSSProperties['marginLeft'];
  order?: React.CSSProperties['order'];
  grow?: React.CSSProperties['flexGrow'];
  shrink?: React.CSSProperties['flexShrink'];
  direction?: React.CSSProperties['flexDirection'];
  wrap?: React.CSSProperties['flexWrap'];
  align?: React.CSSProperties['alignItems'];
  justify?: React.CSSProperties['justifyContent'];
  gap?: React.CSSProperties['gap'];
}

export type GridProps = BaseProps &
  BaseGridProps & {
    [Lowercase in MediaType]?: BaseGridProps;
  };
