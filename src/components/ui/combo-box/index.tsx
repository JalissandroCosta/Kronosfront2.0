'use client'


import { usePrisionerData } from '@/hooks/prisioner/usePrisionerData'
import { cn } from '@/lib/utils'
import { Check, ChevronsUpDown } from 'lucide-react'
import { useState } from 'react'
import { Controller, useFormContext } from 'react-hook-form'
import { Button } from '../button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList
} from '../command'
import { Popover, PopoverContent, PopoverTrigger } from '../popover'
import { FieldWrapper } from './field-wrapper'



type ComboboxProps = {
  placeholder?: string
  label: string
  name: string
  required?: boolean
}

export const  ComboBoxComponet = ({ name, required, label, ...props }: ComboboxProps)=> {
  const [open, setOpen] = useState<boolean>(false)
  const [value, setValue] = useState<string>("")
  const { data } = usePrisionerData()

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
          <Popover  {...props} open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[400px] justify-between"
              >
                {value
                  ? data?.find((d) => d.id === value)?.nome: 'Selecione o Detento...'}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent 
            className="w-[400px] max-h-60 z-[9999] bg-white"
           
            avoidCollisions={false}
            forceMount
            
            >
              <Command>
                <CommandInput placeholder="Procurar detento..." />
                <CommandList className='overflow-y-auto'>
                  <CommandEmpty>Não encontardo.</CommandEmpty>
                  <CommandGroup>
                    {data?.map((detentento) => (
                      <CommandItem
                        key={detentento.id}
                        value={detentento.nome}
                        onSelect={(currentValue) => {
                            setValue(currentValue === value ? '' : currentValue)
                            field.onChange(currentValue === value ? '' : currentValue)
                            setOpen(false)
                          }}
                        >
                        <Check
                          className={cn(
                            'mr-2 h-4 w-4',
                            value === detentento.id
                              ? 'opacity-100'
                              : 'opacity-0'
                          )}
                        />
                        {detentento.nome}
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
