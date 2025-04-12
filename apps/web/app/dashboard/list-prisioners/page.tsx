import { getAllPrisioners } from "@/actions";
import { DataTable } from "@/components/table/data-table";
import { Button } from "@workspace/ui/components/button";
import { AddPrisionerDialog } from "./_components/add-prisioner";
import { columns } from "./_components/columns";

export default async function PagePrisioner() {
  const allPrisioners = await getAllPrisioners()
  return (
    <section className="w-full flex flex-col items-center justify-center p-4 gap-3 ">
       <div className="flex w-full">
       <h2 className="font-bold text-2xl uppercase">Lista de Prisioneiros</h2>
       </div>
       <DataTable 
       columns={columns} 
       data={allPrisioners} 
       search={"nome"}  
       button={
       <AddPrisionerDialog>
          <Button variant="outline" className="ml-auto">
            Adicionar Prisioneiro
          </Button>
       </AddPrisionerDialog>}
       />
   </section>

  );
}