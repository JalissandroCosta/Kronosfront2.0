'use client'

import { Prisioner } from '@/@types'
import { POSTPrisioner } from '@/actions/prisioner'
import {
  Avatar,
  AvatarFallback,
  AvatarImage
} from '@workspace/ui/components/avatar'
import { Button } from '@workspace/ui/components/button'
import { BaseDialogProps, Dialog } from '@workspace/ui/components/dialog'
import { InputField } from '@workspace/ui/components/fields/field'
import { SelectionField } from '@workspace/ui/components/select/field-selection'
import { useToast } from '@workspace/ui/hooks/use-toast'
import { FormProvider, useForm } from 'react-hook-form'

type FormData = Prisioner & {}
// type EditPrisionerProps = BaseDialogProps & {
//  data : {
//   id: string
//   nome: string
//   idade: number
//   cpf: string
//   filiacao: string
//   estadoCivil: 'Solteiro' | 'Casado' | 'Divorciado' | 'Viúvo' | string
//   foto: string
//   reincidencia: boolean
//   createdAt: string // ou Date, se você for converter depois
//   updatedAt: string // idem
//  }
// }

export const AddPrisionerDialog = (props: BaseDialogProps) => {
  const methods = useForm<FormData>()
  const { success, warning } = useToast()

  async function onSubmit(data: FormData) {
    console.log(data)
    try {
      await POSTPrisioner(data)
      props.setOpen?.(false)
      success({
        title: 'Usuário adicionado com sucesso',
        description: `O prisioneiro ${data?.nome} foi adicionado com sucesso.`
      })
    } catch (error) {
      console.log(error)
      warning({
        title: 'Erro ao adicionar prisioneiro',
        description: 'Ocorreu um erro ao adicionar o prisioneiro.'
      })
    }
  }

  return (
    <Dialog
      title="Adicionar Prisioneiro"
      description="Adicione os dados do novo prisioneiro"
      {...props}
      content={
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="grid gap-6"
          >
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={'/default.png'} alt={'Foto do Prisioneiro'} />
                <AvatarFallback>{'PS'}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="grid grid-cols-2 gap-3">
                  <InputField
                    name="cpf"
                    label="CPF"
                    placeholder="Insira o CPF"
                    className=""
                  />
                  <InputField
                    name="idade"
                    label="Idade"
                    placeholder="Insira a Idade"
                    type="number"
                    className=""
                  />
                </div>
              </div>
            </div>

            <InputField
              name="nome"
              label="Nome"
              placeholder="Insira a Nome"
              className=""
            />

            <InputField
              name="foto"
              label="URL da Imagem"
              placeholder="Insira a URL da Imagem"
            />

            <div className="grid grid-cols-2">
              <SelectionField
                label="Estado Civil"
                name="estadoCivil"
                list={['Solteiro', 'Casado', 'Divorciado', 'Viúvo']}
              />
              <InputField
                name="filiacao"
                label="Filiação"
                placeholder="Insira a Filiação"
                className=""
              />
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <Button type="submit" className="cursor-pointer">
                Salvar
              </Button>
            </div>
          </form>
        </FormProvider>
      }
    />
  )
}
