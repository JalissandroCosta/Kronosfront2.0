'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { BaseDialogProps, Dialog } from '@/components/ui/dialog/index'
import { InputField } from '@/components/ui/fields/field'
import { SelectionField } from '@/components/ui/select/field-selection'
import { useToast } from '@/hooks/use-toast'

import { Cela, PrisionerCela } from '@/@types'
import { getAllCelas } from '@/actions/celas'

import { usePrisionerMutate } from '@/hooks/transferencia-prisioner/useTransferPrisionerMutate'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as z from 'zod'

// Esquema de validação
const formDataSchema = z.object({
  id: z.string(),
  nome: z.string().min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
  idade: z
    .string()
    .min(1, { message: 'Idade deve ser maior que 15' })
    .max(2, { message: 'Idade deve ser menor que 80' }),
  cpf: z.string().min(11, { message: 'CPF deve ter pelo menos 11 caracteres' }),
  filiacao: z.string().min(3, { message: 'Adicione nome do Pai ou Mãe' }),
  estadoCivil: z.union([
    z.literal('Solteiro'),
    z.literal('Casado'),
    z.literal('Divorciado'),
    z.literal('Viúvo'),
    z.string()
  ]),
  foto: z
    .string()
    .min(1, { message: 'É obrigatório enviar uma foto do prisioneiro' })
    .url({ message: 'URL de imagem inválida' }),
  reincidencia: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  infractions: z.array(z.string()),
  celaId: z.string(),
  celaDestinoId: z.string()
})

type TransferPrisionerDialogProps = BaseDialogProps & PrisionerCela & {}

export const TransferPrisionerDialog = (
  props: TransferPrisionerDialogProps
) => {
  const [celasAll, setCelasAll] = useState<Cela[]>([])
  const [celasDisp, setCelasDisp] = useState<Cela[]>([])

  const { success, warning } = useToast()
  const { trasnferPrisionerMutate } = usePrisionerMutate()

  useEffect(() => {
    const fetchCelas = async () => {
      const todasAsCelas = await getAllCelas()
      const celasFiltradas = todasAsCelas.filter(
        (cela) => cela.alocacoes.length < cela.capacidade
      )
      setCelasAll(todasAsCelas)
      setCelasDisp(celasFiltradas)
    }
    fetchCelas()
  }, [props.alocacoes, setCelasDisp])

  const methods = useForm<z.infer<typeof formDataSchema>>({
    resolver: zodResolver(formDataSchema),
    defaultValues: {
      id: props.id,
      nome: props.nome,
      idade: String(props.idade),
      cpf: props.cpf,
      filiacao: props.filiacao,
      estadoCivil: props.estadoCivil || 'Solteiro',
      foto: props.foto,
      reincidencia: props.reincidencia,
      createdAt: props.createdAt,
      updatedAt: props.updatedAt,
      infractions: props.infracoes?.map((i) => i.id) || [],
      celaId: props.alocacoes[0].celaId || '',
      celaDestinoId: ''
    }
  })

  function onSubmit(data: z.infer<typeof formDataSchema>) {
    trasnferPrisionerMutate.mutate(
      { detentoId: data.id, celaDestinoId: data.celaDestinoId },
      {
        onSuccess: () => {
          props.setOpen?.(false)
          success({
            title: 'Transferencia realizada com sucesso',
            description: `O prisioneiro ${data?.nome} foi Tranferido com sucesso.`
          })
          methods.reset({
            id: '',
            nome: '',
            idade: '',
            cpf: '',
            filiacao: '',
            estadoCivil: 'Solteiro',
            foto: '',
            reincidencia: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            infractions: [],
            celaId: ''
          })
        },
        onError: () => {
          warning({
            title: 'Erro ao transferir prisioneiro',
            description: 'Ocorreu um erro ao transferir o prisioneiro.'
          })
        }
      }
    )
  }

  return (
    <Dialog
      title="Transferir Prisioneiro"
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
                <AvatarImage
                  src={methods.watch('foto')}
                  alt={methods.watch('nome')}
                />
                <AvatarFallback>
                  {methods.watch('nome')?.substring(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className="flex gap-3">
                {/* <InputField name="id" label="ID" disabled /> */}
                <InputField name="cpf" label="CPF" disabled />
                <InputField name="idade" label="Idade" disabled />
              </div>
            </div>

            <InputField name="nome" label="Nome" disabled />
            <div className="grid grid-cols-4 gap-3">
              <SelectionField
                label="Estado Civil"
                disabled
                name="estadoCivil"
                list={['Solteiro', 'Casado', 'Divorciado', 'Viúvo']}
              />
              <InputField
                name="filiacao"
                label="Filiação"
                className="col-span-2"
                disabled
              />
            </div>

            <div className="flex gap-3">
              <SelectionField
                placeholder="Selecione a cela"
                label="Cela"
                name="celaId"
                disabled
                list={celasAll}
              />
              <SelectionField
                placeholder="Selecione a cela"
                label="Tranferir para:"
                name="celaDestinoId"
                list={celasDisp}
              />
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <Button type="submit">Tranferir</Button>
            </div>
          </form>
        </FormProvider>
      }
    />
  )
}
