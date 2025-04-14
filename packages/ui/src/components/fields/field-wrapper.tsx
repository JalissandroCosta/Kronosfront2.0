import React from 'react'
import { Label } from '../label.js'

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
    <div className={`${className} flex flex-col gap-2`}>
      <Label className="flex flex-col gap-2">{label}</Label>
      {children}
    </div>
  )
}