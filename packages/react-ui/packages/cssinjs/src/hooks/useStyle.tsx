import React from 'react';
import { DynamicCSSOperator } from '../utils/dynamicCSS';

type DesignToken = Record<string, string>;
type ContainerType = Element | DocumentFragment;

interface StyleContext {
  token?: DesignToken;
  cache?: Map<string, string>;
  getContainer?: () => ContainerType;
}

const StyleContextDefault: StyleContext = {};
const StyleContext = React.createContext(StyleContextDefault);

interface StyleContextProviderProps {
  children: React.ReactNode;
  value?: StyleContext;
}

export function StyleContextProvider({ children, value }: StyleContextProviderProps) {
  const { token, cache, getContainer } = value || {};
  const CtxVale = React.useMemo(() => ({ token, cache, getContainer }), [token, cache, getContainer]);
  return <StyleContext.Provider value={CtxVale}>{children}</StyleContext.Provider>;
}

export function useStyle(name: string, styleFn?: (token: DesignToken) => string) {
  const { getContainer, token } = React.useContext(StyleContext);
  const operator = React.useMemo(() => new DynamicCSSOperator(getContainer), [getContainer]);
  const styleFnResult = token && styleFn?.(token);
  return React.useCallback(() => {
    if (styleFnResult) {
      operator.updateCSS(styleFnResult, name);
    }
  }, [token, styleFnResult]);
}
