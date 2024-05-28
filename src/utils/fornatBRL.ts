export function formatSumAsBRL(price: number): string {
  // Calcular a soma dos valores em centavos

  // Converter a soma para reais
  const totalInReais: number = Number(price / 100);

  // Formatar o valor como moeda
  const formattedTotal: string = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(totalInReais);

  return formattedTotal;
}