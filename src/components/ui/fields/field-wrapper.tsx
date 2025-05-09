import React from 'react'
import { Label } from '../label'

interface FieldWrapperProps {
  label: string
  children: React.ReactNode
  className?: string
}

export const FieldWrapper = ({
  label,
  children,
  className
}: FieldWrapperProps) => {
  return (
    <div className={`${className} flex-start flex flex-col gap-2`}>
      <Label className="flex gap-2 text-right">{label}</Label>
      {children}
    </div>
  )
}
