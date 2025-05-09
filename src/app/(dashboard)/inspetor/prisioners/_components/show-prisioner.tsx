'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { BaseDialogProps, Dialog } from '@/components/ui/dialog/index'
import { InputField } from '@/components/ui/fields/field'
import { SelectionField } from '@/components/ui/select/field-selection'

import { FormProvider, useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect } from 'react'
import * as z from 'zod'

const formDataSchema = z.object({
  id: z.string(),
  nome: z.string().min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
  idade: z.number().min(1, { message: 'Idade deve ser maior que 0' }).max(120),
  cpf: z.string().min(11, { message: 'CPF deve ter pelo menos 11 caracteres' }),
  filiacao: z.string().min(3, { message: 'Adicione nome do Pai ou Mãe' }),
  estadoCivil: z.union([
    z.literal('Solteiro'),
    z.literal('Casado'),
    z.literal('Divorciado'),
    z.literal('Viúvo'),
    z.string()
  ]),
  foto: z.string().min(1, { message: 'É obrigatório enviar uma foto' }),
  reincidencia: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  infractions: z.array(z.string()).optional()
})

type ShowPrisionerProps = BaseDialogProps & {
  data: {
    id: string
    nome: string
    idade: number
    cpf: string
    filiacao: string
    estadoCivil: string
    foto: string
    reincidencia: boolean
    createdAt: string
    updatedAt: string
    infractions?: string[]
  }
}

export const ShowPrisionerDialog = (props: ShowPrisionerProps) => {
  const methods = useForm<z.infer<typeof formDataSchema>>({
    resolver: zodResolver(formDataSchema),
    defaultValues: {
      ...props.data,
      idade: Number(props.data.idade) || 0,
      infractions: props.data.infractions || []
    }
  })

  useEffect(() => {
    methods.reset({
      ...props.data,
      idade: Number(props.data.idade),
      infractions: props.data.infractions || []
    })
  }, [props.data, methods])

  return (
    <Dialog
      title="Prisioneiro"
      // description="Edite os dados do prisioneiro"
      {...props}
      content={
        <FormProvider {...methods}>
          <form className="grid gap-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={methods.watch('foto')}
                  alt={methods.watch('nome')}
                />
                <AvatarFallback>
                  {methods.watch('nome')?.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <InputField name="id" label="ID" disabled />
              </div>
            </div>

            <InputField name="nome" label="Nome" disabled />
            <div className="grid grid-cols-3 gap-3">
              <SelectionField
                label="Estado Civil"
                name="estadoCivil"
                list={['Solteiro', 'Casado', 'Divorciado', 'Viúvo']}
                disabled
              />
              <InputField name="cpf" label="CPF" disabled />
              <InputField name="idade" label="Idade" type="number" disabled />
            </div>

            <InputField name="filiacao" label="Filiação" disabled />

            {/* FOTO COM VALIDAÇÃO */}
            {/* <div>
              <label className="block text-sm font-medium">Foto</label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) {
                    const reader = new FileReader()
                    reader.onload = () => {
                      methods.setValue('foto', reader.result as string)
                    }
                    reader.readAsDataURL(file)
                  }
                }}
                className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
              {methods.formState.errors.foto && (
                <p className="text-sm text-red-500 mt-1">
                  {methods.formState.errors.foto.message}
                </p>
              )}
            </div> */}

            {/* INFRAÇÕES - APENAS VISUALIZAÇÃO */}
            <div>
              <label className="mb-1 block text-sm font-medium">
                Crimes Cometidos
              </label>
              <input
                type="text"
                readOnly
                value={methods.watch('infractions')?.join(', ') || ''}
                className="bg-background text-foreground w-full rounded-md border px-3 py-2 text-sm shadow-sm"
                disabled
              />
            </div>
          </form>
        </FormProvider>
      }
    />
  )
}
