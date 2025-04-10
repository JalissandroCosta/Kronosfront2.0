import { getAllPrisioners } from "@/actions";
import { DataTable } from "@/components/table/data-table";
import { columns } from "./_components/columns";

export default async function PagePrisioner() {
  const allPrisioners = await getAllPrisioners()
  return (
    <section className="w-full flex flex-col items-center justify-center p-4 gap-3 ">
       <h2 className="font-bold text-2xl uppercase">Lista de Prisioneiros</h2>
       <DataTable columns={columns} data={allPrisioners} />
   </section>

  );
}