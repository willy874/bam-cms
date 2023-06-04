import React from 'react';
import { merge } from '../libs';
import { DynamicCSSOperator } from '../utils/dynamicCSS';
import { DesignToken } from '../types';
import { getDefaultToken } from '../utils/token';
import { CSSInterpolation, cssStringify } from '../utils';

type ContainerType = Element | DocumentFragment;

interface StyleContext {
  getContainer?: () => ContainerType;
  token?: DesignToken;
  cache?: Map<string, string>;
}

const StyleContextDefault: StyleContext = {};
const StyleContext = React.createContext(StyleContextDefault);

interface StyleContextProviderProps {
  children: React.ReactNode;
  value?: StyleContext;
}

function useStyleContext(value?: StyleContext) {
  const ctxValue = React.useContext(StyleContext);
  const styleContext = value || ctxValue;
  const { cache, token } = styleContext;
  const node = styleContext.getContainer?.() || document.head;
  const getContainer = React.useCallback(() => node, [node]);
  return React.useMemo(
    () => ({
      getContainer,
      token: merge(getDefaultToken(), token),
      cache,
    }),
    [getContainer, token, cache]
  );
}

export function StyleContextProvider({ children, value }: StyleContextProviderProps) {
  const CtxVale = useStyleContext(value);
  return <StyleContext.Provider value={CtxVale}>{children}</StyleContext.Provider>;
}

export function useStyle(key: string, styleFn: (token: DesignToken) => CSSInterpolation) {
  const { getContainer, token } = useStyleContext();
  const operator = React.useMemo(() => new DynamicCSSOperator(getContainer), [getContainer]);
  const styleFnResult = React.useMemo(() => cssStringify(styleFn(token)), [styleFn, token]);
  React.useEffect(() => {
    if (styleFnResult) {
      const styleTag = operator.updateCSS(styleFnResult, key);
      return () => {
        if (styleTag) {
          operator.removeCSS(styleTag);
        }
      };
    }
  }, [key, operator, styleFnResult]);
}
