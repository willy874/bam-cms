import * as React from 'react';

import crypto from 'crypto';

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

Object.defineProperty(window, 'crypto', {
  writable: true,
  value: crypto,
});

Object.defineProperty(window, 'React', {
  writable: true,
  value: React,
});

Object.defineProperty(Element.prototype, 'scrollTo', {
  writable: true,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  value: (_params: { top: number; left: number }) => {},
});
