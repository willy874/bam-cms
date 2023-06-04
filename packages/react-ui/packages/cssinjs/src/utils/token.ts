import { DesignToken } from '../types';

export function getDefaultToken(): DesignToken {
  const defineToken = {
    media: {
      xs: 0,
      sm: 576,
      md: 768,
      lg: 992,
      xl: 1200,
      xxl: 1600,
    },
    column: 24,
  };
  return defineToken;
}
