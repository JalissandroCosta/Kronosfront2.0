'use client'

import { Prisioner } from '@/@types'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

import { BaseDialogProps, Dialog } from '@/components/ui/dialog/index'
import { InputField } from '@/components/ui/fields/field'
import { SelectionField } from '@/components/ui/select/field-selection'
import { useToast } from '@/hooks/use-toast'
import { usePrisionerMutate } from '@/hooks/usePrisionerMutate'

import { FormProvider, useForm } from 'react-hook-form'

type FormData = Prisioner & {}

export const AddPrisionerDialog = (props: BaseDialogProps) => {
  const methods = useForm<FormData>()
  const { success, warning } = useToast()
  const { mutate, isSuccess } = usePrisionerMutate()

  function onSubmit(data: FormData) {
    mutate(data)

    if (isSuccess) {
      success({
        title: 'Prisioneiro adicionado com sucesso',
        description: 'O prisioneiro foi adicionado com sucesso.'
      })

      if (props.setOpen) {
        props.setOpen(false)
      }
      return
    }

    warning({
      title: 'Erro ao adicionar prisioneiro',
      description: 'Ocorreu um erro ao adicionar o prisioneiro.'
    })
    if (props.setOpen) {
      props.setOpen(false)
    }
    return
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
