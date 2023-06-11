import * as React from 'react';

export type QueueCreate = (appendFunc: VoidFunction) => void;

const OrderContext = React.createContext((() => {}) as QueueCreate);

export default OrderContext;
