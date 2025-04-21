export interface Product {
  name: string
  quantity: number
}

export interface Quote {
  id: string
  createdAt: string
  expiresAt: string
  products: Product[]
  notes: string
}

export interface QuoteInput {
  products: Product[]
  notes: string
}
