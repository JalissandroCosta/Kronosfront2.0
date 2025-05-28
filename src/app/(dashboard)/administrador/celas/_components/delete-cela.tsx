'use client'

import { Button } from '@/components/ui/button'
import { BaseDialogProps, Dialog } from '@/components/ui/dialog/index'
import { useCelaMutate } from '@/hooks/celas/useCelasMutate'
import { useToast } from '@/hooks/use-toast'

type DeleteCelaProps = BaseDialogProps & {
  data: {
    id: string
    nome: string
  }
}

export const DeleteCelaDialog = (props: DeleteCelaProps) => {
  const { success, warning } = useToast()
  const { useCelasMutate } = useCelaMutate()

  const DeleteCela = async () => {
    useCelasMutate.mutate(props.data?.id, {
      onSuccess: () => {
        props.setOpen?.(false)
        success({
          title: 'Cela deletado com sucesso',
          description: `A Cela ${props.data?.nome} foi deletada com sucesso.`
        })
      },
      onError: () => {
        warning({
          title: 'Erro ao deletar Cela',
          description: 'Ocorreu um erro ao deletar o Cela.'
        })
      }
    })
  }

  return (
    <Dialog
      title="Deletar Cela"
      description="Tem certeza que deseja deletar o Cela?"
      {...props}
      content={
        <>
          <div className="grid gap-6">
            <div className="mt-4 flex justify-end gap-2">
              {/* <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button> */}
              <Button variant={'destructive'} onClick={() => DeleteCela()}>
                Deletar
              </Button>
            </div>
          </div>
        </>
      }
    />
  )
}
function DeleteCela(): void {
  throw new Error('Function not implemented.')
}

