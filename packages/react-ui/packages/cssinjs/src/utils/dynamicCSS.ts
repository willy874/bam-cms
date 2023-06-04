import { canUseDom } from './node';

const MARK_KEY = 'data-style-key';

export interface ContainerOperationOptions {
  attrs: Record<string, string>;
  prepend: boolean;
  mark: string;
}

type ContainerType = Element | DocumentFragment;

const isStyleElement = (node: Node): node is HTMLStyleElement => {
  return node.nodeName === 'STYLE';
};

export class DynamicCSSOperator {
  getContainer: () => ContainerType;
  caches = new Map();

  constructor(getContainer: () => ContainerType = () => document.head) {
    this.getContainer = getContainer;
  }

  findStyle(target: string | Node | ((n: Node) => boolean)) {
    const styles = Array.from(this.getContainer().children).filter(isStyleElement);
    if (typeof target === 'string') {
      return styles.find((node) => node.getAttribute(MARK_KEY) === target);
    } else if (target instanceof Node) {
      return styles.find((node) => node === target);
    } else {
      return styles.find(target);
    }
  }

  createStyleElement(css: string, attrs?: Record<string, string>) {
    const styleNode = document.createElement('style');
    styleNode.innerHTML = css;
    if (attrs) {
      Object.entries(attrs).forEach(([key, value]) => {
        styleNode.setAttribute(key, value);
      });
    }
    return styleNode;
  }

  injectCSS(css: string, options: Partial<ContainerOperationOptions> = {}) {
    if (!canUseDom()) {
      return null;
    }
    const styleNode = this.createStyleElement(css, options.attrs);
    const container = this.getContainer();
    if (options.mark) {
      styleNode.setAttribute(MARK_KEY, options.mark);
    }
    if (options.prepend) {
      container.insertBefore(styleNode, container.firstChild);
    } else {
      container.appendChild(styleNode);
    }
    return styleNode;
  }

  removeCSS(styleNode: string | Node | (() => Node)) {
    if (!canUseDom()) {
      return;
    }
    const container = this.getContainer();
    const node = this.findStyle(typeof styleNode === 'function' ? styleNode() : styleNode);
    if (node && container.contains(node)) {
      container.removeChild(node);
    }
  }

  updateCSS(css: string, key: string, options: Partial<Omit<ContainerOperationOptions, 'mark'>> = {}) {
    const existNode = this.findStyle(key);
    if (existNode) {
      if (options.attrs) {
        Object.entries(options.attrs).forEach(([key, value]) => {
          existNode.setAttribute(key, value);
        });
      }
      if (existNode.innerHTML !== css) {
        existNode.innerHTML = css;
      }
      return existNode;
    }
    return this.injectCSS(css, {
      ...options,
      mark: key,
    });
  }
}
