'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { BaseDialogProps, Dialog } from '@/components/ui/dialog/index'
import { InputField } from '@/components/ui/fields/field'
import { SelectionField } from '@/components/ui/select/field-selection'
import { useToast } from '@/hooks/use-toast'

import { FormProvider, useForm } from 'react-hook-form'

import { Alocacao, Prisioner as BasePrisioner, Cela, infracoes } from '@/@types'
import { getAllCelas } from '@/actions/celas'
import { usePrisionerMutate } from '@/hooks/prisioner/usePrisionerMutate'
import { uploadImageToCloudinary } from '@/services/cloudinary'
import { zodResolver } from '@hookform/resolvers/zod'
import { Loader2, Pencil } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import * as z from 'zod'
import { TagInput } from './tag-input'

type Prisioner = BasePrisioner & {
  infractions?: string[]
}

const formDataSchema = z.object({
  id: z.string(),
  nome: z.string().min(3, { message: 'Nome deve ter pelo menos 3 caracteres' }),
  idade: z.number().min(1, { message: 'Idade deve ser maior que 0' }).max(120),
  cpf: z.string().min(11, { message: 'CPF deve ter pelo menos 11 caracteres' }),
  filiacao: z.string().min(3, { message: 'Adicione nome do Pai ou Mãe' }),
  estadoCivil: z.union([
    z.literal('Solteiro'),
    z.literal('Casado'),
    z.literal('Divorciado'),
    z.literal('Viúvo'),
    z.string()
  ]),
  foto: z.string().min(1, { message: 'É obrigatório enviar uma foto' }),
  reincidencia: z.boolean(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  infractions: z.array(z.string()).optional(),
  celaId: z.string()
})

type EditPrisionerProps = BaseDialogProps & {
  data: Prisioner & { alocacoes: Alocacao[]; infractions: infracoes[] }
}

export const EditPrisionerDialog = (props: EditPrisionerProps) => {
  const { success, warning } = useToast()
  const [file, setFile] = useState<File>()
  const { PutPrisionerMutate, DelInfraPrisionerMutate } = usePrisionerMutate()
  const [tags, setTags] = useState<infracoes[]>(props.data.infractions || [])
  const [tagsRemoves, setTagsRemoves] = useState<string[]>([])
  const [newTags, setNewsTags] = useState<string[]>([])
  const [celasAll, setCelasAll] = useState<Cela[]>([])

  const inputFileRef = useRef<HTMLInputElement>(null)

  const methods = useForm<z.infer<typeof formDataSchema>>({
    resolver: zodResolver(formDataSchema),
    defaultValues: {
      ...props.data,
      celaId: props.data.alocacoes[0]?.celaId,
      idade: Number(props.data.idade) || 0,
      infractions: props.data.infractions || []
    }
  })

  useEffect(() => {
    if (!props.open) return
    methods.reset({
      ...props.data,
      celaId: props.data.alocacoes[0]?.celaId ?? '',
      idade: Number(props.data.idade) || 0,
      infractions: props.data.infractions
        ? props.data.infractions.map((item: string | infracoes) =>
            typeof item === 'string' ? item : item.descricao
          )
        : []
    })

    const fetchCelas = async () => {
      const todasAsCelas = await getAllCelas()
      const celasFiltradas = todasAsCelas.filter(
        (cela) => cela.alocacoes.length < cela.capacidade
      )
      setCelasAll(celasFiltradas) // Aqui estava errado, você colocava todas em vez de filtradas
    }

    fetchCelas()
  }, [props.open, methods, props.data])

  async function onSubmit(data: z.infer<typeof formDataSchema>) {
    // Pegando só as descrições das novas tags que NÃO foram removidas
    const infracoesParaAdicionar = newTags.filter(
      (descricao) => !tagsRemoves.includes(descricao)
    )

    PutPrisionerMutate.mutate(
      {
        ...data,
        infractions: infracoesParaAdicionar ? infracoesParaAdicionar : [],
        foto: file ? await uploadImageToCloudinary(file as File) : data.foto
      },
      {
        onSuccess: () => {
          props.setOpen?.(false)
          success({
            title: 'Prisioneiro editado com sucesso',
            description: `O prisioneiro ${data?.nome} foi atualizado.`
          })

          // 🔥 Limpar os estados após sucesso
          setNewsTags([])
          setFile(undefined)
        },
        onError: () => {
          warning({
            title: 'Erro ao editar prisioneiro',
            description: 'Ocorreu um erro ao editar o prisioneiro.'
          })
        }
      }
    )

    if (tagsRemoves.length > 0) {
      tagsRemoves.forEach((tagId) => {
        DelInfraPrisionerMutate.mutate(tagId, {
          onSuccess: () => {
            console.log('Infracao deletada com sucesso')
            setTagsRemoves([])
          },
          onError: () => {
            console.log('Erro ao deletar infracao')
          }
        })
      })
    }
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    setFile(e.target.files?.[0])

    if (file) {
      const reader = new FileReader()
      reader.onload = () => {
        methods.setValue('foto', reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Dialog
      title="Editar Prisioneiro"
      description="Edite os dados do prisioneiro"
      {...props}
      content={
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className="grid gap-6"
          >
            <div className="flex items-center gap-4">
              <div
                className="relative cursor-pointer"
                onClick={() => inputFileRef.current?.click()}
              >
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src={methods.watch('foto')}
                    alt={methods.watch('nome')}
                  />
                  <AvatarFallback>
                    {methods.watch('nome')?.substring(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <div className="bg-background absolute right-0 bottom-0 rounded-full p-1 shadow-md">
                  <Pencil className="text-muted-foreground h-4 w-4" />
                </div>
              </div>
              <div className="flex gap-3">
                <InputField name="cpf" label="CPF" />
                <InputField name="idade" label="Idade" />
              </div>
            </div>

            <InputField name="nome" label="Nome" />
            <div className="grid grid-cols-4 gap-3">
              <SelectionField
                label="Estado Civil"
                name="estadoCivil"
                list={['Solteiro', 'Casado', 'Divorciado', 'Viúvo']}
              />
              <InputField
                name="filiacao"
                label="Filiação"
                className="col-span-2"
              />
              <SelectionField
                placeholder="Cela"
                label="Cela"
                name="celaId"
                list={celasAll}
                disabled
              />
            </div>

            <input
              type="file"
              accept="image/*"
              ref={inputFileRef}
              onChange={handleImageChange}
              className="hidden"
            />
            {methods.formState.errors.foto && (
              <p className="mt-1 text-sm text-red-500">
                {methods.formState.errors.foto.message}
              </p>
            )}
            <TagInput
              idDetento={props.data.id}
              tags={tags}
              setTags={setTags}
              setNewTags={setNewsTags}
              setremoves={setTagsRemoves}
              placeholder="Adiione uma infração"
              showSearchIcon={false}
              inputClassName="bg-gray-900 border-gray-700"
              tagsContainerClassName="bg-gray-900 border-gray-700"
            />

            <div className="mt-4 flex justify-end gap-2">
              <Button type="submit" disabled={PutPrisionerMutate.isPending}>
                {PutPrisionerMutate.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Salvando...
                  </>
                ) : (
                  'Salvar'
                )}
              </Button>
            </div>
          </form>
        </FormProvider>
      }
    />
  )
}
