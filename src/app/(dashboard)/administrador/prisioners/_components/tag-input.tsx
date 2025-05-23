"use client"

import { infracoes } from "@/@types"
import { Badge } from "@/components/ui/badge"
import { BaseDialogProps } from "@/components/ui/dialog/index"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { usePrisionerMutate } from "@/hooks/prisioner/usePrisionerMutate"
import { cn } from "@/lib/utils"
import { Search, X } from "lucide-react"
import * as React from "react"

type TagInputProps = BaseDialogProps & {
  idDetento:string,
  tags: infracoes[]
  setTags: React.Dispatch<React.SetStateAction<infracoes[]>>
  placeholder?: string
  inputClassName?: string
  tagsContainerClassName?: string
  showSearchIcon?: boolean
  setremoves: React.Dispatch<React.SetStateAction<string[]>>
  setNewTags: React.Dispatch<React.SetStateAction<string[]>>
}

export function TagInput({
  tags,
  setTags,
  placeholder = "Adicionar infração...",
  inputClassName,
  tagsContainerClassName,
  showSearchIcon = true,
  setOpen,
  setNewTags,
  setremoves,
  idDetento
}: TagInputProps) {
  const [inputValue, setInputValue] = React.useState("")
  const inputRef = React.useRef<HTMLInputElement>(null)
  const { DelInfraPrisionerMutate } = usePrisionerMutate()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value)
  }

 const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  if (e.key === "Enter" && inputValue.trim() !== "") {
    e.preventDefault()

    const descricao = inputValue.trim()

    const exists = tags.some((tag) => tag.descricao === descricao)
    if (!exists) {
     const newTag: infracoes = {
  id: crypto.randomUUID(), // Gera um ID único temporário
  detentoId: idDetento,
  descricao: inputValue.trim(),
  dataInfracao: new Date().toISOString(),
}
      setTags((prev) => [...prev, newTag])
      setNewTags((prev) => [...prev, descricao])
    }
    setInputValue("")
  }
}

  const removeTag  = async (data:{tagId:string, descricao: string}) => {
    if (data.tagId) {
      setremoves((prev) => [...prev, data.tagId])
    }

    setTags(tags.filter((tag) => tag.descricao !== data.descricao))
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="relative">
        <Input
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={inputClassName}
        />
        {showSearchIcon && (
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 opacity-50" />
        )}
      </div>

        <ScrollArea  className="h-32 w-full rounded-md border border-input">
          <div
            className={cn(
              "flex flex-wrap items-center gap-2 rounded-md  border-input  p-2 min-h-[42px]",
              
            )}
          >
            {tags.map((tag, index) => (
  <Badge
    key={tag.id || `${tag.descricao}-${index}`}
    variant="secondary"
    className="bg-muted text-muted-foreground"
  >
    {tag.descricao}
    <button
      type="button"
      className="ml-1 cursor-pointer rounded-full outline-none ring-offset-background focus:ring-1 focus:ring-ring"
      onClick={() => removeTag({ tagId: tag.id || '', descricao: tag.descricao })}
    >
      <X className="h-3 w-3" />
      <span className="sr-only">Remover {tag.descricao}</span>
    </button>
  </Badge>
))}
          </div>
        </ScrollArea>
     
    </div>
  )
}
