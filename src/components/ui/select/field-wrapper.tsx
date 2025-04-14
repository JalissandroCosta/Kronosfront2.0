
import { ReactNode } from 'react'
import { Label } from '../label'

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