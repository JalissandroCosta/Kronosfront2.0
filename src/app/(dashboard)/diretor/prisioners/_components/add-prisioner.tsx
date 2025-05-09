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
  infractions: z.array(z.string()).optional()
})

export const AddPrisionerDialog = (props: BaseDialogProps) => {
  const { success, warning } = useToast()
  const { AddPrisionerMutate } = usePrisionerMutate()

  const methods = useForm<z.infer<typeof formDataSchema>>({
    resolver: zodResolver(formDataSchema),
    defaultValues: {
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
      infractions: []
    }
  })

  function onSubmit(data: z.infer<typeof formDataSchema>) {
    AddPrisionerMutate.mutate(
      { ...data, idade: Number(data.idade) },
      {
        onSuccess: () => {
          props.setOpen?.(false)
          success({
            title: 'Usuário adicionado com sucesso',
            description: `O prisioneiro ${data?.nome} foi adicionado com sucesso.`
          })
        },
        onError: () => {
          warning({
            title: 'Erro ao adicionar prisioneiro',
            description: 'Ocorreu um erro ao adicionar o prisioneiro.'
          })
        }
      }
    )
  }

  return (
    <Dialog
      title="Novo Prisioneiro"
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
                <AvatarImage
                  src={methods.watch('foto') || '/default.png'}
                  alt="Foto do Prisioneiro"
                />
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
                    name="idade"
                    label="Idade"
                    placeholder="Insira a Idade"
                    type="number"
                  />
                </div>
              </div>
            </div>

            <InputField name="nome" label="Nome" placeholder="Insira o Nome" />

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
              />
            </div>

            <div>
              <label className="block text-sm font-medium">
                Infrações Cometidas
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['Furto', 'Roubo', 'Homicídio', 'Tráfico de Drogas'].map(
                  (infraction) => (
                    <div key={infraction} className="flex items-center">
                      <input
                        type="checkbox"
                        id={infraction}
                        value={infraction}
                        onChange={(e) => {
                          const selected =
                            methods.getValues('infractions') || []
                          if (e.target.checked) {
                            methods.setValue('infractions', [
                              ...selected,
                              infraction
                            ])
                          } else {
                            methods.setValue(
                              'infractions',
                              selected.filter((item) => item !== infraction)
                            )
                          }
                        }}
                        className="mr-2"
                      />
                      <label htmlFor={infraction} className="text-sm">
                        {infraction}
                      </label>
                    </div>
                  )
                )}
              </div>
            </div>

            {/* FOTO COM VALIDAÇÃO */}
            <div>
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
