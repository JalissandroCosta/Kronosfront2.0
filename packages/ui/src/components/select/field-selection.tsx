import { ComponentProps } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../select.js'
import { FieldWrapper } from './field-wrapper.js'

type SelectionFieldProps = ComponentProps<typeof Select> & {
  label: string
  name: string
  list: string[]
}

export const SelectionField = ({
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
              <SelectValue placeholder="Selecione" />
            </SelectTrigger>

            <SelectContent>
              <>
                <SelectItem value="0" disabled>
                  Selecione uma opção
                </SelectItem>
                {list.map((item,index) => (
                  <SelectItem
                    key={item}
                    value={item}
                  >
                    {item}
                  </SelectItem>
                ))}
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