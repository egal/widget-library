export interface ToastParams {
  rawHtml?: string
  message?: string
  title?: string
  type?: string
  variant?: string
  flat?: boolean
  icon?: string
  primaryAction?: string
  secondaryAction?: string
  primaryActionCallback?: Function
  secondaryActionCallback?: Function
}

export interface Toast extends ToastParams {
  id: string
  duration: number
}
