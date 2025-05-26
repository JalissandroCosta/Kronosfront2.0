'use client'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { FieldWrapper } from './field-wrapper'

type ComboboxProps = {
  datalist: any[]
  placeholder?: string
  label: string
  name: string
  required?: boolean
}

export const ComboBox = ({
  datalist,
  name,
  required,
  label,
  ...props
}: ComboboxProps) => {
  const [open, setOpen] = useState<boolean>(false)
 
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
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-full justify-between"
              >
                {field.value
                  ? datalist?.find((d) => d.id === field.value)?.nome
                  : 'Selecione o Detento...'}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              side="bottom"
              align="start"
              sideOffset={4}
              avoidCollisions={false}
              className="max-w-[400px] min-w-[350px] p-0"
            >
              <Command>
                <CommandInput placeholder="Procurar ..." />
                <CommandList>
                  <CommandEmpty>Nenhum dado encontrado.</CommandEmpty>
                  <CommandGroup className="max-h-40 overflow-y-auto">
                    {datalist?.map((preso) => (
                      <CommandItem
                        key={preso.id}
                        value={preso.nome}
                        onSelect={() => {
                          const newValue =
                            preso.id === field.value ? '' : preso.id
                          field.onChange(newValue)
                          setOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            field.value === preso.id
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        <div className="flex flex-col">
                          <span>{preso.nome}</span>
                          <span className="text-muted-foreground text-xs">
                            CPF: {preso.cpf}
                          </span>
                        </div>
                        {/* {preso.nome} */}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          {fieldState.error && (
            <p className="text-sm text-red-500">{fieldState.error.message}</p>
          )}
        </FieldWrapper>
      )}
    />
  )
}
