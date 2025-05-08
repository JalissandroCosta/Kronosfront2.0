'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { BaseDialogProps, Dialog } from '@/components/ui/dialog/index'
import { InputField } from '@/components/ui/fields/field'
import { SelectionField } from '@/components/ui/select/field-selection'
import { useToast } from '@/hooks/use-toast'

import { FormProvider, useForm } from 'react-hook-form'

import { usePrisionerMutate } from '@/hooks/prisioner/usePrisionerMutate'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

const formDataSchema = z.object({
  id: z.string(),
  nome: z.string().min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
  idade: z
    .number()
    .min(1, { message: 'Idade deve ser maior que 0' })
    .max(120, { message: 'Idade deve ser menor que 120' }),
  cpf: z.string().min(11, { message: 'CPF deve ter pelo menos 11 caracteres' }), // Você pode adicionar validação específica para CPF se quiser
  filiacao: z.string().min(3, { message: 'Adicione nome do Pai ou Mãe' }),
  estadoCivil: z.union([
    z.literal('Solteiro'),
    z.literal('Casado'),
    z.literal('Divorciado'),
    z.literal('Viúvo'),
    z.string() // permite outros valores que não estão explicitamente listados
  ]),
  foto: z.string().url().min(3, { message: 'Adicione uma URL de foto valida' }), // assume que é uma URL
  reincidencia: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
})

type EditPrisionerProps = BaseDialogProps & {
  data: {
    id: string
    nome: string
    idade: number
    cpf: string
    filiacao: string
    estadoCivil: 'Solteiro' | 'Casado' | 'Divorciado' | 'Viúvo' | string
    foto: string
    reincidencia: boolean
    createdAt: string // ou Date, se você for converter depois
    updatedAt: string // idem
  }
}

export const EditUserDialog = (props: EditPrisionerProps) => {
  const { success, warning } = useToast()
  const { PutPrisionerMutate } = usePrisionerMutate()
  const methods = useForm<z.infer<typeof formDataSchema>>({
    resolver: zodResolver(formDataSchema),
    defaultValues: {
      id: props.data.id || '',
      nome: props.data.nome || '',
      idade: Number(props.data.idade) || 0,
      cpf: props.data.cpf || '',
      filiacao: props.data.filiacao || '',
      estadoCivil: props.data.estadoCivil || 'Solteiro',
      foto: props.data.foto || '',
      reincidencia: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  })

  methods.setValue('nome', props.data.nome || '')
  methods.setValue('id', props.data.id || '')
  methods.setValue('idade', Number(props.data.idade) || 0)
  methods.setValue('foto', props.data.foto || '')
  methods.setValue('cpf', props.data.cpf || '')
  methods.setValue('estadoCivil', props.data.estadoCivil || '')
  methods.setValue('filiacao', props.data.filiacao || '')

  function onSubmit(data: z.infer<typeof formDataSchema>) {
    PutPrisionerMutate.mutate(
      { ...data, idade: Number(data.idade) },
      {
        onSuccess: () => {
          props.setOpen?.(false)
          success({
            title: 'Usuário Editado com sucesso',
            description: `O prisioneiro ${data?.nome} foi Editado com sucesso.`
          })
        },
        onError: () => {
          warning({
            title: 'Erro ao editar prisioneiro',
            description: 'Ocorreu um erro ao aditar o prisioneiro.'
          })
        }
      }
    )
  }

  return (
    <Dialog
      title="Editar Prisioneiro"
      description="Edite os dados do prisioneiro"
      {...props}
      content={
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="grid gap-6"
          >
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={props.data.foto} alt={props.data.nome} />
                <AvatarFallback>
                  {props.data.nome.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="grid grid-cols-2 gap-3">
                  <InputField name="id" label="ID" disabled />
                </div>
              </div>
            </div>
            <InputField name="nome" label="Nome" />
            <InputField name="foto" label="Foto" />
            <div className="grid grid-cols-3 gap-3">
              <SelectionField
                label="Estado Civil"
                name="estadoCivil"
                list={['Solteiro', 'Casado', 'Divorciado', 'Viúvo']}
              />
              <InputField name="cpf" label="CPF" />
              <InputField name="idade" label="Idade" type="number" />
            </div>
            <div className="grid-cols-1">
              <InputField name="filiacao" label="Filiação" />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button type="submit">Salvar</Button>
            </div>
          </form>
        </FormProvider>
      }
    />
  )
}
