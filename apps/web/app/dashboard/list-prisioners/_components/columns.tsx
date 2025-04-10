"use client"

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@workspace/ui/components/button";


export type Prisioner = {
  id: string;
  nome: string;
  idade: number;
  cpf: string;
  filiacao: string;
  estadoCivil: 'Solteiro' | 'Casado' | 'Divorciado';
  foto: string;
  reincidencia: boolean;
  createdAt: string; // ISO Date string
  updatedAt: string; // ISO Date string
}

export const columns: ColumnDef<Prisioner>[] = [
  {
    accessorKey: "nome",
    header: "Nome",
  },
  {
    accessorKey: "cpf",
    header: "CPF",
  },
  {
    accessorKey: "createdAt",
    header: "Data de Criação",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"))
      return date.toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    }
  },
  {
    accessorKey: "updatedAt",
    header: "Data de Atualização",
    cell: ({ row }) => {
      const date = new Date(row.getValue("updatedAt"))
      return date.toLocaleDateString("pt-BR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
    }
  },
  {
    accessorKey: "Ações",
    cell: ({ row }) => {
      return (
        <div className="flex gap-2">
          <Button  variant={"secondary"}>Editar</Button>
          <Button variant={"destructive"}>Excluir</Button>
        </div>
      )
    }
  },

]
