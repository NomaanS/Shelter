/**
 * Type definitions for Hammer.js
 */
declare module 'hammerjs' {
  export default class Hammer {
    constructor(element: HTMLElement | SVGElement, options?: any);
    on(event: string, handler: Function): this;
    off(event: string, handler: Function): this;
    destroy(): void;
  }
} 