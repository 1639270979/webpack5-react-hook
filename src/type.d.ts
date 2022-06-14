/*
 * @Description: 
 * @Author: ShuaiBi
 * @Date: 2021-06-01 17:56:49
 * @LastEditTime: 2022-06-08 13:38:55
 * @LastEditors:  
 */
declare module "*.png"
declare module "*.jpg"
declare module "*.svg"
declare module "*.svg"
declare module '*.css' {
  const styles: { readonly [key: string]: string };
  export default styles;
}

declare module '*.scss' {
  const styles: { readonly [key: string]: string };
  export default styles;
}
declare const __DEV__: boolean
interface Window {
  session: Session;
}