export const fontList: {
  Raleway: string
  'Open Sans': string
  Inter: string
  default: string
}
export namespace weightList {
  export const medium: string
  export const regular: string
  export const bold: string
  const _default: string
  export { _default as default }
}
export function getFont(font: string | undefined): string
export function getFontWeight(weight: string | undefined): string
export { variables }
