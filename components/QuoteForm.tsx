"use client"

import type React from "react"

import { useState } from "react"
import type { Product } from "../types"

interface QuoteFormProps {
  onSubmit: (products: Product[], notes: string) => void
  isSubmitting: boolean
  initialProducts?: Product[]
  initialNotes?: string
}

export default function QuoteForm({ onSubmit, isSubmitting, initialProducts = [], initialNotes = "" }: QuoteFormProps) {
  const [products, setProducts] = useState<Product[]>(
    initialProducts.length > 0 ? initialProducts : [{ name: "", quantity: 1 }],
  )
  const [notes, setNotes] = useState(initialNotes)

  const handleProductChange = (index: number, field: keyof Product, value: string | number) => {
    const updatedProducts = [...products]
    updatedProducts[index] = {
      ...updatedProducts[index],
      [field]: value,
    }
    setProducts(updatedProducts)
  }

  const addProduct = () => {
    setProducts([...products, { name: "", quantity: 1 }])
  }

  const removeProduct = (index: number) => {
    if (products.length > 1) {
      const updatedProducts = [...products]
      updatedProducts.splice(index, 1)
      setProducts(updatedProducts)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Basic validation
    const validProducts = products.filter((p) => p.name.trim() !== "")
    if (validProducts.length === 0) {
      alert("Please add at least one product")
      return
    }

    onSubmit(validProducts, notes)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-2">Products</h2>

        {products.map((product, index) => (
          <div key={index} className="flex items-center space-x-4 mb-4">
            <div className="flex-grow">
              <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
              <input
                type="text"
                value={product.name}
                onChange={(e) => handleProductChange(index, "name", e.target.value)}
                className="w-full border rounded px-3 py-2"
                placeholder="Enter product name"
                required
              />
            </div>

            <div className="w-24">
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
              <input
                type="number"
                value={product.quantity}
                onChange={(e) => handleProductChange(index, "quantity", Number.parseInt(e.target.value) || 1)}
                className="w-full border rounded px-3 py-2"
                min="1"
                required
              />
            </div>

            <button
              type="button"
              onClick={() => removeProduct(index)}
              className="mt-6 text-red-500 hover:text-red-700"
              disabled={products.length === 1}
            >
              Remove
            </button>
          </div>
        ))}

        <button type="button" onClick={addProduct} className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded">
          Add Another Product
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full border rounded px-3 py-2 h-32"
          placeholder="Add any additional notes here..."
        />
      </div>

      <div className="flex space-x-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className={`bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : ""
          }`}
        >
          {isSubmitting ? "Saving..." : "Save Quote"}
        </button>

        <a href="/" className="bg-gray-300 hover:bg-gray-400 px-6 py-2 rounded">
          Cancel
        </a>
      </div>
    </form>
  )
}
