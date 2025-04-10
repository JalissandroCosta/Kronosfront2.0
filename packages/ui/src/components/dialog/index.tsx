import { ReactNode } from 'react'
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  Dialog as DialogRoot,
  DialogTitle,
  DialogTrigger
} from './primitive.js'

export type BaseDialogProps = {
  children?: ReactNode
  open?: boolean
  setOpen?: (open: boolean) => void
}

type DialogProps = BaseDialogProps & {
  title: string
  description?: string | ReactNode
  content: ReactNode
  footer?: string | ReactNode
}

export const Dialog = ({
  children,
  content,
  description,
  footer,
  title,
  open,
  setOpen
}: DialogProps) => {
  return (
    <DialogRoot open={open} onOpenChange={setOpen}>
      {children && (
        <DialogTrigger asChild className="cursor-pointer">
          {children}
        </DialogTrigger>
      )}

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {content}
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </DialogRoot>
  )
}