'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { BaseDialogProps, Dialog } from '@/components/ui/dialog/index'
import { InputField } from '@/components/ui/fields/field'
import { useToast } from '@/hooks/use-toast'

import { Cela } from '@/@types'
import { getAllCelas } from '@/actions/celas'
import { ComboBox } from '@/app/(dashboard)/administrador/visitante/_components/combo-box'
import { usePrisionerMutate } from '@/hooks/prisioner/usePrisionerMutate'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import * as z from 'zod'

// Esquema de validação
const formDataSchema = z.object({
  nome: z.string().min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
  cpf: z.string().min(11, { message: 'CPF deve ter pelo menos 11 caracteres' }),
  grauParentesco: z.string()
  // foto: z
  //   .string()
  //   .min(1, { message: 'É obrigatório enviar uma foto do prisioneiro' })
  //   .url({ message: 'URL de imagem inválida' }),
})

export const AddVisitaDialog = (props: BaseDialogProps) => {
  const [celas, setCelas] = useState<Cela[]>([])
  const { success, warning } = useToast()
  const { AddPrisionerMutate } = usePrisionerMutate()

  useEffect(() => {
    const fetchCelas = async () => {
      const todasAsCelas = await getAllCelas()
      const celasFiltradas = todasAsCelas.filter(
        (cela) => cela.alocacoes.length < cela.capacidade
      )

      setCelas(celasFiltradas)
    }

    fetchCelas()
  }, [setCelas])

  const methods = useForm<z.infer<typeof formDataSchema>>({
    resolver: zodResolver(formDataSchema),
    defaultValues: {
      nome: '',
      cpf: '',
      grauParentesco: ''
      // foto: '',
    }
  })

  function onSubmit(data: z.infer<typeof formDataSchema>) {
    // AddPrisionerMutate.mutate(
    //   { ...data, idade: Number(data.idade) },
    //   {
    //     onSuccess: () => {
    //       props.setOpen?.(false)
    //       success({
    //         title: 'Usuário adicionado com sucesso',
    //         description: `O prisioneiro ${data?.nome} foi adicionado com sucesso.`
    //       })
    //       methods.reset({
    //         id: '',
    //         nome: '',
    //         idade: '',
    //         cpf: '',
    //         filiacao: '',
    //         estadoCivil: 'Solteiro',
    //         foto: '',
    //         reincidencia: false,
    //         createdAt: new Date().toISOString(),
    //         updatedAt: new Date().toISOString(),
    //         infractions: [],
    //         celaId: ''
    //       })
    //     },
    //     onError: () => {
    //       warning({
    //         title: 'Erro ao adicionar prisioneiro',
    //         description: 'Ocorreu um erro ao adicionar o prisioneiro.'
    //       })
    //     }
    //   }
    // )
  }

  return (
    <Dialog
      title="Novo Visitante"
      description="Adicione os dados do novo visitante"
      {...props}
      content={
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="grid gap-6"
          >
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={'/default.png'} alt="Foto do Visitante" />
                <AvatarFallback>{'PS'}</AvatarFallback>
              </Avatar>
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
                        value = value.replace(
                          /^(\d{3})\.(\d{3})(\d)/,
                          '$1.$2.$3'
                        )
                      if (value.length > 11)
                        value = value.replace(
                          /^(\d{3})\.(\d{3})\.(\d{3})(\d)/,
                          '$1.$2.$3-$4'
                        )
                      e.target.value = value.slice(0, 14)
                      methods.setValue('cpf', e.target.value)
                    }}
                  />
                  <InputField
                    name="grauParentesco"
                    label="Grau Parentesco"
                    placeholder="Insira o nivel Parentesco"
                  />
                </div>
              </div>
            </div>

            <InputField name="nome" label="Nome" placeholder="Insira o Nome" />
            <div className='w-full'>
              <ComboBox label="detento" name="detento" />
            </div>
            <div className="flex w-full flex-row justify-between gap-4">
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
                  className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:rounded-full file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100"
                />
                {methods.formState.errors.foto && (
                  <p className="mt-1 text-sm text-red-500">
                    {methods.formState.errors.foto.message}
                  </p>
                )}
              </div> */}
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
