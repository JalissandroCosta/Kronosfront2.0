'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

import { BaseDialogProps, Dialog } from '@/components/ui/dialog/index'
import { InputField } from '@/components/ui/fields/field'
import { SelectionField } from '@/components/ui/select/field-selection'
import { useToast } from '@/hooks/use-toast'

import { FormProvider, useForm } from 'react-hook-form'

import { usePrisionerMutate } from '@/hooks/prisioner/usePrisionerMutate'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

// type FormData = Prisioner & {}

const formDataSchema = z.object({
  id: z.string(),
  nome: z.string().min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
  idade: z
    .string()
    .min(1, { message: 'Idade deve ser maior que 18' })
    .max(2, { message: 'Idade deve ser menor que 100' }),
  cpf: z.string().min(11, { message: 'CPF deve ter pelo menos 11 caracteres' }), // Você pode adicionar validação específica para CPF se quiser
  filiacao: z.string().min(3, { message: 'Adicione nome do Pai ou Mãe' }),
  estadoCivil: z.union([
    z.literal('Solteiro'),
    z.literal('Casado'),
    z.literal('Divorciado'),
    z.literal('Viúvo'),
    z.string() // permite outros valores que não estão explicitamente listados
  ]),
  foto: z.string().url().min(3, { message: 'Adicione uma URL de foto valida' }), // assume que é uma URL
  reincidencia: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
})

export const AddPrisionerDialog = (props: BaseDialogProps) => {
  const { success, warning } = useToast()
  const { AddPrisionerMutate } = usePrisionerMutate()

  const methods = useForm<z.infer<typeof formDataSchema>>({
    resolver: zodResolver(formDataSchema),
    defaultValues: {
      id: '',
      nome: '',
      idade: '18',
      cpf: '',
      filiacao: '',
      estadoCivil: 'Solteiro',
      foto: '',
      reincidencia: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
  })

  function onSubmit(data: z.infer<typeof formDataSchema>) {
    AddPrisionerMutate.mutate(
      { ...data, idade: Number(data.idade) },
      {
        onSuccess: () => {
          props.setOpen?.(false)
          success({
            title: 'Usuário adicionado com sucesso',
            description: `O prisioneiro ${data?.nome} foi adicionado com sucesso.`
          })
        },
        onError: () => {
          warning({
            title: 'Erro ao adicionar prisioneiro',
            description: 'Ocorreu um erro ao adicionar o prisioneiro.'
          })
        }
      }
    )
  }

  return (
    <Dialog
      title="Novo Prisioneiro"
      description="Adicione os dados do novo prisioneiro"
      {...props}
      content={
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="grid gap-6"
          >
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={'/default.png'} alt={'Foto do Prisioneiro'} />
                <AvatarFallback>{'PS'}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                 <div className="grid grid-cols-2 gap-3">
                  <InputField
                  name="cpf"
                  label="CPF"
                  placeholder="Insira o CPF"
                  className=""
                  maxLength={14}
                  required
                  onChange={(e) => {
                    let value = e.target.value.replace(/\D/g, ''); // Remove non-numeric characters
                    if (value.length > 3) value = value.replace(/^(\d{3})(\d)/, '$1.$2');
                    if (value.length > 7) value = value.replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
                    if (value.length > 11) value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
                    e.target.value = value.slice(0, 14); // Limit to 14 characters
                    methods.setValue('cpf', e.target.value);
                  }}
                  />

                    <InputField
                    name="idade"
                    label="Idade"
                    placeholder="Insira a Idade"
                    type="number"
                    className=""
                  />
              </div>

              </div>
            </div>

            <InputField
              name="nome"
              label="Nome"
              placeholder="Insira a Nome"
              className=""
            />


            <div className="grid grid-cols-2">
              <SelectionField
                label="Estado Civil"
                name="estadoCivil"
                list={['Solteiro', 'Casado', 'Divorciado', 'Viúvo']}
              />
              <InputField
                name="filiacao"
                label="Filiação"
                placeholder="Insira a Filiação"
                className=""
              />
            </div>

  <div className="space-y-6">
  {/* Crimes contra a Pessoa */}
  <div>
    <label className="font-semibold">Crimes contra a Pessoa</label>
    <div className="space-y-1 pl-4">
      <label><input type="checkbox" name="crimes" value="Homicídio" /> Homicídio</label><br />
      <label><input type="checkbox" name="crimes" value="Feminicídio" /> Feminicídio</label><br />
      <label><input type="checkbox" name="crimes" value="Infanticídio" /> Infanticídio</label><br />
      <label><input type="checkbox" name="crimes" value="Aborto" /> Aborto</label><br />
      <label><input type="checkbox" name="crimes" value="Lesão corporal" /> Lesão corporal</label><br />
      <label><input type="checkbox" name="crimes" value="Ameaça" /> Ameaça</label><br />
      <label><input type="checkbox" name="crimes" value="Calúnia" /> Calúnia</label><br />
      <label><input type="checkbox" name="crimes" value="Sequestro e cárcere privado" /> Sequestro e cárcere privado</label><br />
      <label><input type="checkbox" name="crimes" value="Maus-tratos" /> Maus-tratos</label><br />
      <label><input type="checkbox" name="crimes" value="Violência doméstica" /> Violência doméstica</label>
    </div>
  </div>

  {/* Crimes contra o Patrimônio */}
  <div>
    <label className="font-semibold">Crimes contra o Patrimônio</label>
    <div className="space-y-1 pl-4">
      <label><input type="checkbox" name="crimes" value="Furto" /> Furto</label><br />
      <label><input type="checkbox" name="crimes" value="Roubo" /> Roubo</label><br />
      <label><input type="checkbox" name="crimes" value="Extorsão" /> Extorsão</label><br />
      <label><input type="checkbox" name="crimes" value="Estelionato" /> Estelionato</label><br />
      <label><input type="checkbox" name="crimes" value="Apropriação indébita" /> Apropriação indébita</label><br />
      <label><input type="checkbox" name="crimes" value="Dano" /> Dano</label><br />
      <label><input type="checkbox" name="crimes" value="Receptação" /> Receptação</label><br />
      <label><input type="checkbox" name="crimes" value="Latrocínio" /> Latrocínio</label>
    </div>
  </div>

  {/* Crimes contra a Administração Pública */}
  <div>
    <label className="font-semibold">Crimes contra a Administração Pública</label>
    <div className="space-y-1 pl-4">
      <label><input type="checkbox" name="crimes" value="Corrupção" /> Corrupção</label><br />
      <label><input type="checkbox" name="crimes" value="Peculato" /> Peculato</label><br />
      <label><input type="checkbox" name="crimes" value="Concussão" /> Concussão</label><br />
      <label><input type="checkbox" name="crimes" value="Prevaricação" /> Prevaricação</label><br />
      <label><input type="checkbox" name="crimes" value="Desobediência" /> Desobediência</label><br />
      <label><input type="checkbox" name="crimes" value="Resistência à prisão" /> Resistência à prisão</label><br />
      <label><input type="checkbox" name="crimes" value="Falsidade ideológica" /> Falsidade ideológica</label>
    </div>
  </div>

  {/* Crimes de Trânsito */}
  <div>
    <label className="font-semibold">Crimes de Trânsito</label>
    <div className="space-y-1 pl-4">
      <label><input type="checkbox" name="crimes" value="Dirigir alcoolizado" /> Dirigir alcoolizado</label><br />
      <label><input type="checkbox" name="crimes" value="Racha" /> Racha</label><br />
      <label><input type="checkbox" name="crimes" value="Homicídio culposo no trânsito" /> Homicídio culposo no trânsito</label><br />
      <label><input type="checkbox" name="crimes" value="Omissão de socorro" /> Omissão de socorro</label>
    </div>
  </div>

  {/* Lei de Drogas */}
  <div>
    <label className="font-semibold">Crimes da Lei de Drogas</label>
    <div className="space-y-1 pl-4">
      <label><input type="checkbox" name="crimes" value="Tráfico de drogas" /> Tráfico de drogas</label><br />
      <label><input type="checkbox" name="crimes" value="Associação para o tráfico" /> Associação para o tráfico</label><br />
      <label><input type="checkbox" name="crimes" value="Posse de droga para uso pessoal" /> Posse de droga para uso pessoal</label><br />
      <label><input type="checkbox" name="crimes" value="Financiamento ao tráfico" /> Financiamento ao tráfico</label>
    </div>
  </div>

  {/* Crimes da Lei de Armas */}
  <div>
    <label className="font-semibold">Crimes da Lei de Armas</label>
    <div className="space-y-1 pl-4">
      <label><input type="checkbox" name="crimes" value="Porte ilegal de arma de fogo" /> Porte ilegal de arma de fogo</label><br />
      <label><input type="checkbox" name="crimes" value="Posse irregular" /> Posse irregular</label><br />
      <label><input type="checkbox" name="crimes" value="Tráfico internacional de armas" /> Tráfico internacional de armas</label>
    </div>
  </div>

  {/* Crimes contra a Dignidade Sexual */}
  <div>
    <label className="font-semibold">Crimes contra a Dignidade Sexual</label>
    <div className="space-y-1 pl-4">
      <label><input type="checkbox" name="crimes" value="Estupro" /> Estupro</label><br />
      <label><input type="checkbox" name="crimes" value="Assédio sexual" /> Assédio sexual</label><br />
      <label><input type="checkbox" name="crimes" value="Importunação sexual" /> Importunação sexual</label><br />
      <label><input type="checkbox" name="crimes" value="Exploração sexual de menores" /> Exploração sexual de menores</label><br />
      <label><input type="checkbox" name="crimes" value="Pornografia infantil" /> Pornografia infantil</label>
    </div>
  </div>

  {/* Crimes contra a Fé Pública */}
  <div>
    <label className="font-semibold">Crimes contra a Fé Pública</label>
    <div className="space-y-1 pl-4">
      <label><input type="checkbox" name="crimes" value="Falsificação de documentos" /> Falsificação de documentos</label><br />
      <label><input type="checkbox" name="crimes" value="Moeda falsa" /> Moeda falsa</label><br />
      <label><input type="checkbox" name="crimes" value="Uso de documento falso" /> Uso de documento falso</label>
    </div>
  </div>

  {/* Crimes Ambientais */}
  <div>
    <label className="font-semibold">Crimes Ambientais</label>
    <div className="space-y-1 pl-4">
      <label><input type="checkbox" name="crimes" value="Desmatamento ilegal" /> Desmatamento ilegal</label><br />
      <label><input type="checkbox" name="crimes" value="Poluição" /> Poluição</label><br />
      <label><input type="checkbox" name="crimes" value="Maus-tratos a animais" /> Maus-tratos a animais</label><br />
      <label><input type="checkbox" name="crimes" value="Pesca ilegal" /> Pesca ilegal</label>
    </div>
  </div>

  {/* Crimes Cibernéticos */}
  <div>
    <label className="font-semibold">Crimes Cibernéticos</label>
    <div className="space-y-1 pl-4">
      <label><input type="checkbox" name="crimes" value="Invasão de dispositivo informático" /> Invasão de dispositivo informático</label><br />
      <label><input type="checkbox" name="crimes" value="Estelionato eletrônico" /> Estelionato eletrônico</label><br />
      <label><input type="checkbox" name="crimes" value="Divulgação de imagens íntimas" /> Divulgação de imagens íntimas</label><br />
      <label><input type="checkbox" name="crimes" value="Crimes de ódio e fake news" /> Crimes de ódio e fake news</label>
    </div>
  </div>
</div>


            <div>
              <label className="block text-sm font-medium">
              Foto
              </label>
              <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                const reader = new FileReader()
                reader.onload = () => {
                  methods.setValue('foto', reader.result as string)
                }
                reader.readAsDataURL(file)
                }
              }}
              className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            <div className="mt-4 flex justify-end gap-2">
              <Button type="submit" className="cursor-pointer">
                Salvar
              </Button>
            </div>
          </form>
        </FormProvider>
      }
    />
  )
}
