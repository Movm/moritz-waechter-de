/// <reference types="vite/client" />

declare module '*.mdx' {
  import { ComponentType } from 'react';
  const Component: ComponentType;
  export default Component;
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}
