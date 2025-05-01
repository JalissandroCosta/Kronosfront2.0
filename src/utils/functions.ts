

import { Prisioner, Visita } from "@/@types";


export function contarPrisioneirosPorMes(prisioneiros: Prisioner[]) {
  const contagem: Record<string, number> = {};

  prisioneiros.forEach((p) => {
    const data = new Date(p.createdAt);
    const nomeMes = data.toLocaleString("pt-BR", { month: "long" });
    const mesCapitalizado = nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1);

    contagem[mesCapitalizado] = (contagem[mesCapitalizado] || 0) + 1;
  });

  // Transformar em array de objetos
  const resultado = Object.entries(contagem).map(([month, detento]) => ({
    month,
    detento,
  }));

  // Ordenar por mês corretamente (usando índice do mês)
  const ordemMeses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  resultado.sort((a, b) => {
    return ordemMeses.indexOf(a.month) - ordemMeses.indexOf(b.month);
  });

  return resultado;
}



export function contarVisitasPorMes(visitas: Visita[]) {
  const contagem: Record<string, number> = {};

  visitas.forEach((v) => {
    const data = new Date(v.dataVisita);

    if (isNaN(data.getTime())) return; // Ignora datas inválidas

    const nomeMes = data.toLocaleString("pt-BR", { month: "long" });
    const mesCapitalizado = nomeMes
      ? nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1)
      : "Data Inválida";

    // Incrementa a contagem de visitas para o mês
    contagem[mesCapitalizado] = (contagem[mesCapitalizado] || 0) + 1;
  });

  const resultado = Object.entries(contagem).map(([month, visita]) => ({
    month,
    visita,
  }));

  // Ordem dos meses do ano para garantir a ordenação correta
  const ordemMeses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  // Ordena o resultado de acordo com a ordem dos meses
  resultado.sort((a, b) => ordemMeses.indexOf(a.month) - ordemMeses.indexOf(b.month));

  return resultado;
}


type VisitasProps = { month: string, visita: number }[]
type DetentosProps = { month: string, detento: number }[]


export function mesclarDados(visitas: VisitasProps, detentos: DetentosProps) {
  // Criando um objeto para armazenar os dados mesclados
  const dadosMesclados: Record<string, { visita: number, detento: number }> = {};

  // Preenchendo o objeto com os dados de visitas
  visitas.forEach((v) => {
    dadosMesclados[v.month] = { visita: v.visita, detento: 0 }; // Inicializa detento com 0
  });

  // Preenchendo o objeto com os dados de detentos
  detentos.forEach((d) => {
    if (dadosMesclados[d.month]) {
      dadosMesclados[d.month].detento = d.detento; // Substitui ou adiciona a contagem de detentos
    } else {
      dadosMesclados[d.month] = { visita: 0, detento: d.detento }; // Caso não exista o mês, inicializa com visita 0
    }
  });

  // Convertendo o objeto de volta para um array
  const resultado = Object.entries(dadosMesclados).map(([month, { visita, detento }]) => ({
    month,
    visita,
    detento,
  }));

  // Ordem dos meses do ano para garantir a ordenação correta
  const ordemMeses = [
    "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
    "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
  ];

  // Ordena o resultado de acordo com a ordem dos meses
  resultado.sort((a, b) => ordemMeses.indexOf(a.month) - ordemMeses.indexOf(b.month));

  return resultado;
}






