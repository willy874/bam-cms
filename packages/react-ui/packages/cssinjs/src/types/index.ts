export type MediaType = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

type MediaPointMap = {
  [K in MediaType]: number;
};

type GridToken = {
  media: MediaPointMap;
  column: number;
};

export type DesignToken = { [key: string]: any } & GridToken;
