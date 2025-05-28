export default async function Page() {


  return (
    <div className="flex flex-1 flex-col">
      <div className="@container/main flex flex-1 flex-col gap-2">
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
         
          <div className="flex w-full flex-col justify-evenly gap-6 px-4 lg:flex-row lg:px-5">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Bem vindo Inspetor{" "}!
            <br/>
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Sua nova realidade comeca aqui!
            </span>
          </h1>
          </div>
        </div>
      </div>
    </div>
  )
}
