import { Prisioner, Visita } from '@/@types'

export function contarPrisioneirosPorMes(prisioneiros: Prisioner[]) {
  const contagem: Record<string, number> = {}

  prisioneiros.forEach((p) => {
    const data = new Date(p.createdAt)
    const nomeMes = data.toLocaleString('pt-BR', { month: 'long' })
    const mesCapitalizado = nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1)

    contagem[mesCapitalizado] = (contagem[mesCapitalizado] || 0) + 1
  })

  // Transformar em array de objetos
  const resultado = Object.entries(contagem).map(([month, detento]) => ({
    month,
    detento
  }))

  // Ordenar por mês corretamente (usando índice do mês)
  const ordemMeses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ]

  resultado.sort((a, b) => {
    return ordemMeses.indexOf(a.month) - ordemMeses.indexOf(b.month)
  })

  return resultado
}

export function contarVisitasPorMes(visitas: Visita[]) {
  const contagem: Record<string, number> = {}

  visitas.forEach((v) => {
    const data = new Date(v.dataVisita)

    if (isNaN(data.getTime())) return // Ignora datas inválidas

    const nomeMes = data.toLocaleString('pt-BR', { month: 'long' })
    const mesCapitalizado = nomeMes
      ? nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1)
      : 'Data Inválida'

    // Incrementa a contagem de visitas para o mês
    contagem[mesCapitalizado] = (contagem[mesCapitalizado] || 0) + 1
  })

  const resultado = Object.entries(contagem).map(([month, visita]) => ({
    month,
    visita
  }))

  // Ordem dos meses do ano para garantir a ordenação correta
  const ordemMeses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ]

  // Ordena o resultado de acordo com a ordem dos meses
  resultado.sort(
    (a, b) => ordemMeses.indexOf(a.month) - ordemMeses.indexOf(b.month)
  )

  return resultado
}

type VisitasProps = { month: string; visita: number }[]
type DetentosProps = { month: string; detento: number }[]

export function mesclarDados(visitas: VisitasProps, detentos: DetentosProps) {
  // Criando um objeto para armazenar os dados mesclados
  const dadosMesclados: Record<string, { visita: number; detento: number }> = {}

  // Preenchendo o objeto com os dados de visitas
  visitas.forEach((v) => {
    dadosMesclados[v.month] = { visita: v.visita, detento: 0 } // Inicializa detento com 0
  })

  // Preenchendo o objeto com os dados de detentos
  detentos.forEach((d) => {
    if (dadosMesclados[d.month]) {
      dadosMesclados[d.month].detento = d.detento // Substitui ou adiciona a contagem de detentos
    } else {
      dadosMesclados[d.month] = { visita: 0, detento: d.detento } // Caso não exista o mês, inicializa com visita 0
    }
  })

  // Convertendo o objeto de volta para um array
  const resultado = Object.entries(dadosMesclados).map(
    ([month, { visita, detento }]) => ({
      month,
      visita,
      detento
    })
  )

  // Ordem dos meses do ano para garantir a ordenação correta
  const ordemMeses = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro'
  ]

  // Ordena o resultado de acordo com a ordem dos meses
  resultado.sort(
    (a, b) => ordemMeses.indexOf(a.month) - ordemMeses.indexOf(b.month)
  )

  return resultado
}

type DadosMensais = {
  month: string
  visita: number
  detento: number
}

export function calcularTendencia(
  dados: DadosMensais[],
  chave: 'visita' | 'detento'
): string {
  if (dados.length < 2)
    return 'Não há dados suficientes para calcular a tendência'

  const penultimo = dados[dados.length - 2][chave]
  const ultimo = dados[dados.length - 1][chave]

  if (penultimo === 0) return 'Nenhum dado anterior para comparar'

  const diferenca = ultimo - penultimo
  const percentual = (diferenca / penultimo) * 100
  const direcao = diferenca > 0 ? 'alta' : 'baixa'
  const valorFormatado = Math.abs(percentual).toFixed(1)

  return `Tendências de ${direcao} de ${valorFormatado}% neste mês.`
}

export type VerificarTrendingProps = {
  direcao: string
  valorFormatado: string
}

export function verificarTrending(
  dados: DadosMensais[],
  chave: 'visita' | 'detento'
): VerificarTrendingProps {
  if (dados.length < 2) {
    return {
      direcao: 'estável',
      valorFormatado: '0.0'
    }
  }

  const penultimo = dados[dados.length - 2][chave]
  const ultimo = dados[dados.length - 1][chave]

  const diferenca = ultimo - penultimo
  const percentual = (diferenca / penultimo) * 100
  const direcao = diferenca > 0 ? 'subiu' : 'caiu'
  const valorFormatado = Math.abs(percentual).toFixed(1)

  return { direcao, valorFormatado }
}

function resumeName(name: string) {
  const partes = name.split(' ')
  if (partes.length > 2) {
    return partes[0] + ' ' + partes[1]
  } else if (partes.length === 2) {
    return partes[0] + ' ' + partes[1]
  } else {
    return partes[0]
  }
}

export function getTop6DetentosMaisVisitados(visitas: Visita[]) {
  const contador = new Map<
    string,
    { visitas: number; preso: string; foto: string }
  >()

  visitas.forEach((visita) => {
    const { detentoId, detento } = visita
    if (!contador.has(detentoId)) {
      contador.set(detentoId, {
        visitas: 1,
        preso: resumeName(detento.nome),
        foto: detento.foto
      })
    } else {
      contador.get(detentoId)!.visitas++
    }
  })

  const ordenados = Array.from(contador.entries())
    .sort((a, b) => b[1].visitas - a[1].visitas)
    .slice(0, 6)
    .map(([detentoId, data]) => ({
      detentoId,
      preso: data.preso,
      visitas: data.visitas,
      foto: data.foto
    }))

  return ordenados
}
