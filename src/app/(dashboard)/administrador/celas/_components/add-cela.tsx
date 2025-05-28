'use client'

import { Button } from '@/components/ui/button'
import { BaseDialogProps, Dialog } from '@/components/ui/dialog/index'
import { useToast } from '@/hooks/use-toast'

import { InputField } from '@/components/ui/fields/field'
import { useCelaMutate } from '@/hooks/celas/useCelasMutate'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import * as z from 'zod'

// Esquema de validação
const formDataSchema = z.object({
  numero: z.string(),
  capacidade: z.string(),
  pavilhao: z.string()
})

export const AddCelaDialog = (props: BaseDialogProps) => {
  const { AddCelaMutate } = useCelaMutate()
  const { success, warning } = useToast()

  const methods = useForm<z.infer<typeof formDataSchema>>({
    resolver: zodResolver(formDataSchema),
    defaultValues: {
      numero: '',
      capacidade: '',
      pavilhao: ''
    }
  })

  function onSubmit(data: z.infer<typeof formDataSchema>) {
    AddCelaMutate.mutate(
      {
        capacidade: Number(data.capacidade),
        numero: Number(data.numero),
        pavilhao: data.pavilhao
      },
      {
        onSuccess: () => {
          props.setOpen?.(false)
          success({
            title: 'Cela criada com sucesso',
            description: `A cela  foi adicionado com sucesso.`
          })
          methods.reset({
            numero: '',
            capacidade: '',
            pavilhao: ''
          })
        },
        onError: () => {
          warning({
            title: 'Erro ao adicionar visitante',
            description: 'Ocorreu um erro ao adicionar o visitante.'
          })
        }
      }
    )
  }

  return (
    <Dialog
      title="Nova Cela"
      description="Adicione uma nova cela"
      {...props}
      content={
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="grid gap-6"
          >
            <InputField
              name="numero"
              label="Numero"
              placeholder="Insira o Nº da Cela"
            />
            <InputField
              name="capacidade"
              label="Capacidade"
              placeholder="Insira o Capacidade"
            />
            <InputField
              name="pavilhao"
              label="Pavilhão"
              placeholder="Insira o Pavilhao"
            />
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
