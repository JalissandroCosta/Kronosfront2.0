import { Label } from '@workspace/ui/components/label'
import { ReactNode } from 'react'

interface FieldWrapperProps {
  label: string
  children: ReactNode
  className?: string
}

export const FieldWrapper = ({
  label,
  children,
  className
}: FieldWrapperProps) => {
  return (
    <div className={`${className} flex flex-col gap-2`}>
      <Label className="flex gap-2">{label}</Label>
      {children}
    </div>
  )
}