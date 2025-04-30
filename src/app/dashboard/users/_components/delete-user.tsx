'use client'

import { Button } from '@/components/ui/button'
import { BaseDialogProps, Dialog } from '@/components/ui/dialog/index'
import { usePrisionerMutate } from '@/hooks/prisioner/usePrisionerMutate'
import { useToast } from '@/hooks/use-toast'

type DeletePrisionerProps = BaseDialogProps & {
  data: {
    id: string
    nome: string
  }
}

export const DeleteUserDialog = (props: DeletePrisionerProps) => {
  const { success, warning } = useToast()
  const { DelPrisionerMutate } = usePrisionerMutate()

  const DeletePrisioner = async () => {
    DelPrisionerMutate.mutate(props.data?.id, {
      onSuccess: () => {
        props.setOpen?.(false)
        success({
          title: 'Usuário deletar com sucesso',
          description: `O prisioneiro ${props.data?.nome} foi deletar com sucesso.`
        })
      },
      onError: () => {
        warning({
          title: 'Erro ao deletar prisioneiro',
          description: 'Ocorreu um erro ao deletar o prisioneiro.'
        })
      }
    })
  }

  return (
    <Dialog
      title="Deletar Prisioneiro"
      description="Tem certaza que deseja deletar o prisioneiro?"
      {...props}
      content={
        <>
          <div className="grid gap-6">
            <div className="mt-4 flex justify-end gap-2">
              {/* <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button> */}
              <Button variant={'destructive'} onClick={() => DeletePrisioner()}>
                Deletar
              </Button>
            </div>
          </div>
        </>
      }
    />
  )
}
