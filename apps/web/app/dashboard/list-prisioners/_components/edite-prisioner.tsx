import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import { Button } from "@workspace/ui/components/button";
import { BaseDialogProps, Dialog } from "@workspace/ui/components/dialog";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";


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
     <div className="grid gap-6">
          <div className="flex items-center gap-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={props.data.foto} alt={props.data.nome} />
              <AvatarFallback>{props.data.nome.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="id">ID</Label>
                  <Input id="id" 
                  value={props.data.id} 
                  disabled
                  // onChange={(e) => handleChange("id", e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Idade</Label>
                  <Input
                    id="age"
                    type="number"
                    value={props.data.idade}
                    // onChange={(e) => handleChange("age", Number.parseInt(e.target.value))}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" 
            value={props.data.nome} 
            // onChange={(e) => handleChange("name", e.target.value)} 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">URL da Imagem</Label>
            <Input
              id="imageUrl"
              value={props.data.foto}
              // onChange={(e) => handleChange("imageUrl", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="maritalStatus">Estado Civil</Label>
              <Select
                value={props.data.estadoCivil}
                // onValueChange={(value) => handleChange("maritalStatus", value)}
              >
                <SelectTrigger id="maritalStatus">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Solteiro">Solteiro</SelectItem>
                  <SelectItem value="Casado">Casado</SelectItem>
                  <SelectItem value="Divorciado">Divorciado</SelectItem>
                  <SelectItem value="Viúvo">Viúvo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="supervisor">Filiação</Label>
              <Input
                id="supervisor"
                value={props.data.filiacao}
                // onChange={(e) => handleChange("supervisor", e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            {/* <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button> */}
            <Button onClick={()=>console.log("Salvar")}>Salvar</Button>
          </div>
        </div>
      </>
    }
    
    />

  )
}