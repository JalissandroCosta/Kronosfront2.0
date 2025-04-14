'use client'

import { Prisioner } from '@/@types'
import { PUTPrisioner } from '@/actions/prisioner'
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { BaseDialogProps, Dialog } from '@/components/ui/dialog/index'
import { InputField } from '@/components/ui/fields/field'
import { SelectionField } from '@/components/ui/select/field-selection'
import { useToast } from '@/hooks/use-toast'

import { FormProvider, useForm } from 'react-hook-form'

type FormData = Prisioner & {}

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

export const EditPrisionerDialog = (props: EditPrisionerProps) => {
  const { success, warning } = useToast()
  const methods = useForm<FormData>({
    defaultValues: props.data
  })

  methods.setValue('nome', props.data.nome || '')
  methods.setValue('id', props.data.id || '')
  methods.setValue('idade', Number(props.data.idade) || 0)
  methods.setValue('foto', props.data.foto || '')
  methods.setValue('cpf', props.data.cpf || '')
  methods.setValue('estadoCivil', props.data.estadoCivil || '')
  methods.setValue('filiacao', props.data.filiacao || '')

  async function onSubmit(data: FormData) {
    try {
      await PUTPrisioner(data)
      props.setOpen?.(false)
      success({
        title: 'Usuário editado com sucesso',
        description: `O prisioneiro ${data?.nome} foi editado com sucesso.`
      })
    } catch (error) {
      console.log(error)
      warning({
        title: 'Erro ao editar prisioneiro',
        description: 'Ocorreu um erro ao editar o prisioneiro.'
      })
    }
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
            className="grid gap-6">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={props.data.foto} alt={props.data.nome} />
                <AvatarFallback>
                  {props.data.nome.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="grid grid-cols-2 gap-3">
                  <InputField
                    name="id"
                    label="ID"
                    disabled
                  />
                </div>
              </div>
            </div>
            <InputField
              name="nome"
              label="Nome"
            />
            <InputField
              name="foto"
              label="Foto"
            />
            <div className="grid grid-cols-3 gap-3">
              <SelectionField
                label="Estado Civil"
                name="estadoCivil"
                list={['Solteiro', 'Casado', 'Divorciado', 'Viúvo']}
              />
              <InputField
                name="cpf"
                label="CPF"
              />
              <InputField
                name="idade"
                label="Idade"
                type='number'
              />
            </div>
            <div className='grid-cols-1'>
              <InputField
                name="filiacao"
                label="Filiação"
              />
            </div>
            <div className="mt-4 flex justify-end gap-2">
              <Button type='submit'>Salvar</Button>
            </div>
          </form>
        </FormProvider>
      }
    />
  )
}
