import * as React from 'react';
import { createPortal } from 'react-dom';
import { supportRef, useComposeRef } from './utils/ref';
import OrderContext from './utils/Context';
import useDom from './utils/useDom';

export type ContainerType = Element | DocumentFragment;

export type GetContainer = undefined | string | ContainerType | (() => ContainerType) | false;

export interface PortalProps {
  getContainer?: GetContainer;
  children?: React.ReactNode;
  open?: boolean;
  autoDestroy?: boolean;
}

const getPortalContainer = (getContainer: GetContainer) => {
  if (getContainer === false) {
    return null;
  }
  if (typeof getContainer === 'string') {
    return document.querySelector(getContainer);
  }
  if (typeof getContainer === 'function') {
    return getContainer();
  }
  if (typeof getContainer === 'undefined') {
    return document.body;
  }
  return getContainer;
};

const Portal = React.forwardRef<any, PortalProps>((props, ref) => {
  const { open, getContainer, autoDestroy = true, children } = props;

  const [shouldRender, setShouldRender] = React.useState(open);

  const mergedRender = shouldRender || open;

  // ====================== Should Render ======================
  React.useEffect(() => {
    if (autoDestroy || open) {
      setShouldRender(open);
    }
  }, [open, autoDestroy]);

  // ======================== Container ========================
  const [innerContainer, setInnerContainer] = React.useState(() =>
    getContainer ? getPortalContainer(getContainer) : document.body
  );

  React.useEffect(() => {
    const customizeContainer = getPortalContainer(getContainer);
    setInnerContainer(customizeContainer ?? null);
  });
  const [defaultContainer, queueCreate] = useDom(Boolean(mergedRender && !innerContainer));
  const mergedContainer = innerContainer ?? defaultContainer;

  let childRef: React.Ref<any> = null;

  if (children && supportRef(children) && ref) {
    ({ ref: childRef } = children as any);
  }

  const mergedRef = useComposeRef(childRef, ref);
  if (!mergedRender || innerContainer === undefined) {
    return null;
  }

  let reffedChildren = children;
  if (ref) {
    reffedChildren = React.cloneElement(children as any, {
      ref: mergedRef,
    });
  }

  return (
    <OrderContext.Provider value={queueCreate}>{createPortal(reffedChildren, mergedContainer)}</OrderContext.Provider>
  );
});

if (process.env.NODE_ENV !== 'production') {
  Portal.displayName = 'Portal';
}

export default Portal;
