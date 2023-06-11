import * as React from 'react';
import OrderContext from './Context';
import type { QueueCreate } from './Context';

const EMPTY_LIST: VoidFunction[] = [];

export default function useDom(render: boolean): [HTMLDivElement, QueueCreate] {
  const [ele] = React.useState(() => document.createElement('div'));

  // ========================== Order ==========================
  const appendedRef = React.useRef(false);

  const queueCreate = React.useContext(OrderContext);
  const [queue, setQueue] = React.useState<VoidFunction[]>(EMPTY_LIST);

  const mergedQueueCreate =
    queueCreate ||
    (appendedRef.current
      ? undefined
      : (appendFn: VoidFunction) => {
          setQueue((origin) => {
            const newQueue = [appendFn, ...origin];
            return newQueue;
          });
        });

  // =========================== DOM ===========================
  function append() {
    if (!ele.parentElement) {
      document.body.appendChild(ele);
    }

    appendedRef.current = true;
  }

  function cleanup() {
    ele.parentElement?.removeChild(ele);

    appendedRef.current = false;
  }

  React.useLayoutEffect(() => {
    if (render) {
      if (queueCreate) {
        queueCreate(append);
      } else {
        append();
      }
    } else {
      cleanup();
    }

    return cleanup;
  }, [render]);

  React.useLayoutEffect(() => {
    if (queue.length) {
      queue.forEach((appendFn) => appendFn());
      setQueue(EMPTY_LIST);
    }
  }, [queue]);

  return [ele, mergedQueueCreate];
}
