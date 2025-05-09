import { Cela } from '@/@types'
import { ComponentProps } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../select'
import { FieldWrapper } from './field-wrapper'

type SelectionFieldProps = ComponentProps<typeof Select> & {
  placeholder?: string
  label: string
  name: string
  list: string[] | Cela[] 
}

export const SelectionField = ({
  placeholder = 'Selecione a opção',
  label,
  name,
  list,
  required,
  ...props
}: SelectionFieldProps) => {
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
          <Select
            {...field}
            {...props}
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <SelectTrigger>
              <SelectValue placeholder={placeholder} />
            </SelectTrigger>

            <SelectContent>
              <>
                <SelectItem value="0" disabled>
                  {placeholder}
                </SelectItem>
                { list.map((item) => {
                  if (typeof item === 'string') {
                    return (
                      <SelectItem key={item} value={item}>
                        {item}
                      </SelectItem>
                    )
                  } else  {
                    return (
                      <SelectItem key={item.id} value={item.id}>
                        Cela {item.numero}
                      </SelectItem>
                    )
                  }
                })}
              </>
            </SelectContent>
          </Select>

          {fieldState.error && (
            <p className="text-sm text-red-500">{fieldState.error.message}</p>
          )}
        </FieldWrapper>
      )}
    />
  )
}
