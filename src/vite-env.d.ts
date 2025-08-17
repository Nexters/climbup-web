/// <reference types="vite/client" />

declare const __MSW_ENABLED__: boolean;

declare module "*.lottie" {
  const content: string;
  export default content;
}
