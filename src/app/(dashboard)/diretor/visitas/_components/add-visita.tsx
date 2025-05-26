'use client'

import { Button } from '@/components/ui/button'
import { BaseDialogProps, Dialog } from '@/components/ui/dialog/index'
import { useToast } from '@/hooks/use-toast'

import { usePrisionerData } from '@/hooks/prisioner/usePrisionerData'
import { useVisitanteData } from '@/hooks/visitante/useVisitanteData'
import { useVisitanteMutate } from '@/hooks/visitante/useVisitanteMutate'
import { useVisitaMutate } from '@/hooks/visitas/useVisitasMutate'
import { zodResolver } from '@hookform/resolvers/zod'
import { FormProvider, useForm } from 'react-hook-form'
import * as z from 'zod'
import { ComboBox } from './combo-box'

// Esquema de validação
const formDataSchema = z.object({
  visitanteId: z.string(),
  detentoId: z.string()
})

export const AddVisitaDialog = (props: BaseDialogProps) => {

  const { data } = usePrisionerData()
  const visitantes = useVisitanteData()
  const {AddVisitaMutate}=useVisitaMutate()
  const { success, warning } = useToast()
  const { AddVisitanteMutate } = useVisitanteMutate()



  const methods = useForm<z.infer<typeof formDataSchema>>({
    resolver: zodResolver(formDataSchema),
    defaultValues: {
      visitanteId: '',
      detentoId: ''
    }
  })

  function onSubmit(data: z.infer<typeof formDataSchema>) {
    AddVisitaMutate.mutate(
      { 
       ...data
      },
      {
        onSuccess: () => {
          props.setOpen?.(false)
          success({
            title: 'Visita registrada com sucesso',
            description: `O visitante  foi adicionado com sucesso.`
          })
          methods.reset({
            visitanteId: '',
            detentoId: ''
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
      title="Nova Visita"
      description="Adicione os dados da nova visita"
      {...props}
      content={
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="grid gap-6"
          >
            <div className='flex justify-between gap-3'>
              <ComboBox label="Visitante" name="visitanteId" datalist={visitantes.data!} />
              <ComboBox label="Preso" name="detentoId" datalist={data!} />
            </div>
          
            {/* <InputField name="nome" label="Nome" placeholder="Insira o Nome" />
            <div className="w-full">
              <ComboBox label="detento" name="idDetento" />
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
