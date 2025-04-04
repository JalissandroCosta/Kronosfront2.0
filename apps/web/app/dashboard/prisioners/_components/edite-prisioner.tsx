"use client"

import { PUTPrisioner } from "@/actions/prisioner";
import { Avatar, AvatarFallback, AvatarImage } from "@workspace/ui/components/avatar";
import { Button } from "@workspace/ui/components/button";
import { BaseDialogProps, Dialog } from "@workspace/ui/components/dialog";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@workspace/ui/components/select";
import { useToast } from "@workspace/ui/hooks/use-toast";
import { useState } from "react";


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

   const { success, warning } = useToast()

  const [prisioner, setPrisioner] = useState(props.data)
  

  const editePrisioner = async () => {
   try {
    await PUTPrisioner(prisioner)
    props.setOpen?.(false)
    success({
      title: 'Usuário editado com sucesso',
      description: `O prisioneiro ${prisioner.nome} foi editado com sucesso.`,
    })
    
   } catch (error) {
    console.log(error)
    warning({
      title: 'Erro ao editar prisioneiro',
      description: 'Ocorreu um erro ao editar o prisioneiro.',
    })
   }
    
  }

  const handleChange = (key: keyof typeof prisioner, value: any) => {
    setPrisioner((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

 


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
              <AvatarImage src={prisioner.foto} alt={prisioner.nome} />
              <AvatarFallback>{prisioner.nome.substring(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label htmlFor="id">ID</Label>
                  <Input id="id" 
                  value={prisioner.id} 
                  disabled
                  onChange={(e) => handleChange("id", e.target.value)} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="idade">Idade</Label>
                  <Input
                    id="idade"
                    type="number"
                    value={prisioner.idade}
                     onChange={(e) => handleChange("idade", Number.parseInt(e.target.value))}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nome">Nome</Label>
            <Input id="nome" 
            value={prisioner.nome} 
            onChange={(e) => handleChange("nome", e.target.value)} 
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="foto">URL da Imagem</Label>
            <Input
              id="foto"
              value={prisioner.foto}
              onChange={(e) => handleChange("foto", e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="estadoCivil">Estado Civil</Label>
              <Select
                value={prisioner.estadoCivil}
                onValueChange={(value) => handleChange("estadoCivil", value)}
              >
                <SelectTrigger id="estadoCivil">
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
              <Label htmlFor="filiacao">Filiação</Label>
              <Input
                id="filiacao"
                value={prisioner.filiacao}
                 onChange={(e) => handleChange("filiacao", e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            {/* <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button> */}
            <Button onClick={()=>editePrisioner()}>Salvar</Button>
          </div>
        </div>
      </>
    }
    
    />

  )
}