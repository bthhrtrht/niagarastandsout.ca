// global.d.ts
export {}; // ensure this file is treated as a module

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    gtag?: (...args: any[]) => void;
  }
}