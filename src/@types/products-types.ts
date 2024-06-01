export type product = {
  id: string
  name: string
  url: string
  price: string
  category: string
  important: string
  urgency: string
  isGift: string
}



type category  = {
  category: 'cozinha' | 'banheiro' | 'sala' | 'enxoval' | 'quarto' | 'outros'
}