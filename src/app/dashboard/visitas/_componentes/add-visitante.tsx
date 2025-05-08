'use client'
import React from 'react'

import { Button } from '@/components/ui/button'
import { BaseDialogProps, Dialog } from '@/components/ui/dialog/index'
import { InputField } from '@/components/ui/fields/field'
import { SelectionField } from '@/components/ui/select/field-selection'
import { useToast } from '@/hooks/use-toast'

import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useVisitanteMutate } from '@/hooks/visitante/useVisitanteMutate'

// Esquema de validação
const formDataSchema = z.object({
  idDetento: z.string().min(1, { message: 'Informe o ID do detento' }),
  nome: z.string().min(3, { message: 'Informe o nome do visitante' }),
  cpf: z.string().min(11, { message: 'Informe o CPF do visitante' }),
  grauParentesco: z.string().min(1, { message: 'Informe o grau de parentesco do visitante' }),
})

export const AddVisitanteDialog = (props: BaseDialogProps) => {
  const { success, warning } = useToast()
  const { AddVisitanteMutate } = useVisitanteMutate()

  const methods = useForm<z.infer<typeof formDataSchema>>({
    resolver: zodResolver(formDataSchema),
    defaultValues: {
      idDetento: '',
      cpf: '',
      nome: '',
      grauParentesco: '', // sempre string
    }
  })

  function onSubmit(data: z.infer<typeof formDataSchema>) {
    console.log('data', data)
    AddVisitanteMutate.mutate(
      {
        idDetento: data.idDetento,
        nome: data.nome,
        cpf: data.cpf,
        grauParentesco: data.grauParentesco,
      },
      {
        onSuccess: () => {
          props.setOpen?.(false)
          success({
            title: 'Visitante adicionado com sucesso',
            description: `O visitante ${data?.nome} foi adicionado com sucesso.`
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
      title="Novo Visitante"
      open={props.open}
      description="Adicione os dados do novo visitante"
      {...props}
      content={
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="grid gap-6">
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="grid grid-cols-2 gap-3">
                  <InputField
                    name="cpf"
                    label="CPF"
                    placeholder="Insira o CPF"
                    maxLength={14}
                    required
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, '')
                      if (value.length > 3)
                        value = value.replace(/^(\d{3})(\d)/, '$1.$2')
                      if (value.length > 7)
                        value = value.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
                      if (value.length > 11)
                        value = value.replace(
                          /^(\d{3})\.(\d{3})\.(\d{3})(\d)/,
                          '$1.$2.$3-$4'
                        )
                      e.target.value = value.slice(0, 14)
                      methods.setValue('cpf', e.target.value)
                    }}
                  />
                </div>
              </div>
            </div>

            <InputField
              name="nome"
              label="Nome"
              placeholder="Insira o Nome do Visitante"
              required
            />

            <div className="grid grid-cols-2">
              <SelectionField
                label="Grau de Parentesco"
                name="grauParentesco"
                list={['Pai/Mãe', 'Filho', 'Irmão', 'conjuge', 'Amigo', 'Advogado']}
              />
            </div>

            <InputField
              name="idDetento"
              label="ID do Detento"
              placeholder="Insira o ID do Detento"
              required
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
