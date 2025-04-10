import { BaseDialogProps, Dialog } from "@workspace/ui/components/dialog";


type EditPrisionerProps = BaseDialogProps & {
 data : {
  id: string
  nome: string
  idade: number
  cpf: string
  filiacao: string
  estadoCivil: 'Solteiro' | 'Casado' | 'Divorciado' | 'Viúvo' | string
  foto: string
  reincidencia: boolean
  createdAt: string // ou Date, se você for converter depois
  updatedAt: string // idem
 }
}


export const EditPrisionerDialog = (props:EditPrisionerProps) => {
  return(
    <Dialog 
    title="Editar Prisioneiro"
    description="Edite os dados do prisioneiro"
    {...props}
    content={
      <>
      <span className="text-white">{props.data.cpf}</span>
      <span>{props.data.nome}</span>
      <span>{props.data.foto}</span>
      <span>{props.data.estadoCivil}</span>
      <span>{props.data.filiacao}</span>
      <span>{props.data.idade}</span>
      </>
    }
    
    />

  )
}