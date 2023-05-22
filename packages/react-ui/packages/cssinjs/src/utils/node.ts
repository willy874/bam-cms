export function canUseDom() {
  return !!(typeof window !== 'undefined' && window.document && window.document.createElement);
}

export enum NodeType {
  ELEMENT_NODE = Node.ELEMENT_NODE,
  ATTRIBUTE_NODE = Node.ATTRIBUTE_NODE,
  TEXT_NODE = Node.TEXT_NODE,
  CDATA_SECTION_NODE = Node.CDATA_SECTION_NODE,
  PROCESSING_INSTRUCTION_NODE = Node.PROCESSING_INSTRUCTION_NODE,
  COMMENT_NODE = Node.COMMENT_NODE,
  DOCUMENT_NODE = Node.DOCUMENT_NODE,
  DOCUMENT_TYPE_NODE = Node.DOCUMENT_TYPE_NODE,
  DOCUMENT_FRAGMENT_NODE = Node.DOCUMENT_FRAGMENT_NODE,
}

export function isShadowDom(node: Node): node is ShadowRoot {
  return node && node.nodeType === NodeType.DOCUMENT_FRAGMENT_NODE && node instanceof ShadowRoot;
}

function findNodeParentNodeInternal(node: Node, fn: (node: Node) => boolean): Node | null {
  if (fn(node)) {
    return node;
  }
  if (node.parentNode) {
    return findNodeParentNodeInternal(node.parentNode, fn);
  }
  return null;
}

export const findShadowRoot = (node: Node): ShadowRoot | null => {
  return findNodeParentNodeInternal(node, isShadowDom) as ShadowRoot;
};

export function contains(root: Node, target: Node) {
  const node = findNodeParentNodeInternal(target, (n) => n === root);
  return Boolean(node);
}
