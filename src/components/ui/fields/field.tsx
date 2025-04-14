import { ComponentProps } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Input } from '../input'
import { FieldWrapper } from './field-wrapper'

type InputField = ComponentProps<typeof Input> & {
  label: string
  name: string
}

export const InputField = ({ label, name, required, ...props }: InputField) => {
  const { control } = useFormContext()
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required && 'Campo Obrigatório'
      }}
      render={({ field, fieldState }) => (
        <FieldWrapper label={label} {...props}>
          <Input {...field} {...props} />
          {fieldState.error && (
            <p className="text-sm text-red-500">{fieldState.error.message}</p>
          )}
        </FieldWrapper>
      )}
    />
  )
}
