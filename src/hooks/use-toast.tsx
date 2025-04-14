import { toast as sonnerToast, ToastT } from 'sonner'

type ToastProps = {
  title?: string
  description?: string
  action?: ToastT['action']
  cancel?: ToastT['cancel']
}

export const useToast = () => {
  const toast = (props: ToastProps) => {
    sonnerToast(props.title, {
      description: props.description,
      action: props.action,
      cancel: props.cancel
    })
  }

  const success = (props: ToastProps) => {
    sonnerToast.success(props.title, {
      description: props.description,
      action: props.action,
      cancel: props.cancel
    })
  }

  const error = (props: ToastProps) => {
    sonnerToast.error(props.title, {
      description: props.description,
      action: props.action,
      cancel: props.cancel
    })
  }

  const warning = (props: ToastProps) => {
    sonnerToast.warning(props.title, {
      description: props.description,
      action: props.action,
      cancel: props.cancel
    })
  }

  const info = (props: ToastProps) => {
    sonnerToast.info(props.title, {
      description: props.description,
      action: props.action,
      cancel: props.cancel
    })
  }

  return { toast, success, error, warning, info }
}
