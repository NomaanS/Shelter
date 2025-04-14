/**
 * Type definitions for @babel/generator
 */
declare module '@babel/generator' {
  export default function generate(ast: any, opts?: any, code?: string | { [filename: string]: string }): { code: string; map?: object };
} 