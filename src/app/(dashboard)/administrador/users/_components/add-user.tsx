'use client'

import { Button } from '@/components/ui/button'

import { BaseDialogProps, Dialog } from '@/components/ui/dialog/index'
import { InputField } from '@/components/ui/fields/field'
import { useToast } from '@/hooks/use-toast'

import { FormProvider, useForm } from 'react-hook-form'

import { SelectionField } from '@/components/ui/select/field-selection'
import { usePrisionerMutate } from '@/hooks/prisioner/usePrisionerMutate'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

// type FormData = Prisioner & {}

const formDataSchema = z.object({
  nome: z.string().min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
  cpf: z.string().min(11, { message: 'CPF deve ter pelo menos 11 caracteres' }), // Você pode adicionar validação específica para CPF se quiser
  cargo: z.string(),
  senha: z.string()
})

export const AddUserDialog = (props: BaseDialogProps) => {
  const { success, warning } = useToast()
  const { AddPrisionerMutate } = usePrisionerMutate()

  const methods = useForm<z.infer<typeof formDataSchema>>({
    resolver: zodResolver(formDataSchema),
    defaultValues: {
      nome: '',
      cpf: '',
      cargo: '',
      senha: ''
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
      title="Novo Usúario"
      description="Adicione os dados do novo usúario"
      {...props}
      content={
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="grid gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <div className="grid grid-cols-4 gap-3">
                  <InputField
                    name="cpf"
                    label="CPF"
                    placeholder="Insira o CPF"
                    className="col-span-3"
                    maxLength={14}
                    required
                    onChange={(e) => {
                      let value = e.target.value.replace(/\D/g, '') // Remove non-numeric characters
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
                      e.target.value = value.slice(0, 14) // Limit to 14 characters
                      methods.setValue('cpf', e.target.value)
                    }}
                  />
                 
                   <SelectionField
                    placeholder="Selecione o cargo"
                    label="Cargo"
                    name="cargo"
                    list={['ADM', 'INSP', 'DIR']}
                  />
                </div>
                <div className="pt-3 grid grid-cols-4 gap-3">
                  <InputField
                    name="nome"
                    label="Nome"
                    placeholder="Insira o Nome"
                    className="col-span-4"
                  />
               
                </div>
                 <div className="pt-3 grid grid-cols-4 gap-3">
                  <InputField
                    name="senha"
                    label="Senha"
                    placeholder="Insira o senha"
                    className="col-span-3"
                    type='password'
                  />
                   <SelectionField
                    placeholder="Selecione o Nivel"
                    label="Nivel"
                    name="nivelPermissao"
                    list={['1', '2', '3','4','5','6','7','8','9','10']}
                  />
                </div>
                {/* <div className="p-2">
                    <InputField
                      name="e-mail"
                      label="E-mail"
                      placeholder="@kronos.com.br"
                      className=""
                    />
                    </div> */}
              </div>
            </div>

            {/* <div>
              <label className="block text-sm font-medium">
              Foto
              </label>
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
            </div> */}

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
