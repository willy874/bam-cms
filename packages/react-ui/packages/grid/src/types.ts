import { MediaType } from '@/cssinjs';

export type BaseProps<T = HTMLDivElement> = React.HTMLAttributes<T> & {
  classNames?: string | string[] | Record<string, boolean>;
};

export interface BaseFlexProps {
  display?: 'flex' | 'inline-flex' | 'block' | 'inline-block' | 'none';
  span?: number;
  offset?: number;
  order?: number;
  grow?: number;
  shrink?: number;
  direction?: 'column' | 'row';
  wrap?: 'wrap' | 'nowrap';
  align?: 'center' | 'end' | 'start';
  justify?: 'around' | 'between' | 'evenly' | 'center' | 'end' | 'start';
}

export type FlexProps = BaseProps &
  BaseFlexProps & {
    [Lowercase in MediaType]?: BaseFlexProps;
  };
