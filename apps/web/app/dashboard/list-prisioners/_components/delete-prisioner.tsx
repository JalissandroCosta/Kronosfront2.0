"use client"

import { DELETEPrisioner } from "@/actions";
import { Button } from "@workspace/ui/components/button";
import { BaseDialogProps, Dialog } from "@workspace/ui/components/dialog";
import { useToast } from "@workspace/ui/hooks/use-toast";


type DeletePrisionerProps = BaseDialogProps & {
 data : {
  id: string
  nome: string
 }
}


export const DeletePrisionerDialog = (props:DeletePrisionerProps) => {

   const { success, warning } = useToast()

  
  const DeletePrisioner = async () => {
   try {
    await DELETEPrisioner(props.data.id)
    props.setOpen?.(false)
    success({
      title: 'Usuário deletado com sucesso',
      description: `O prisioneiro ${props.data.nome} foi deletado com sucesso.`,
    })
    
   } catch (error) {
    console.log(error)
    warning({
      title: 'Erro ao deletar prisioneiro',
      description: 'Ocorreu um erro ao deletar o prisioneiro.',
    })
   }
    
  }

 
 


  return(
    <Dialog 
    title="Deletar Prisioneiro"
    description="Tem certaza que deseja deletar o prisioneiro?"
    {...props}
    content={
      <>
        <div className="grid gap-6">
        

          <div className="flex justify-end gap-2 mt-4">
            {/* <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button> */}
            <Button variant={"destructive"} onClick={()=>DeletePrisioner()}>Deletar</Button>
          </div>
        </div>
      </>
    }
    
    />

  )
}