const express = require("express")
const cors = require("cors")
const { v4: uuidv4 } = require("uuid")

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors())
app.use(express.json())

// In-memory storage for quotes
const quotes = []

// JWT Auth Stub Middleware
const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Unauthorized" })
  }

  // In a real app, you would verify the token here
  // For this stub, we'll just pass through

  next()
}

// Routes
// Get all quotes
app.get("/quotes", authMiddleware, (req, res) => {
  res.json(quotes)
})

// Get a specific quote
app.get("/quotes/:id", authMiddleware, (req, res) => {
  const quote = quotes.find((q) => q.id === req.params.id)

  if (!quote) {
    return res.status(404).json({ message: "Quote not found" })
  }

  res.json(quote)
})

// Create a new quote
app.post("/quotes", authMiddleware, (req, res) => {
  const { products, notes } = req.body

  if (!products || !Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ message: "Products are required" })
  }

  const now = new Date()
  const expiresAt = new Date(now)
  expiresAt.setDate(expiresAt.getDate() + 14) // 14 days by default

  const newQuote = {
    id: uuidv4(),
    createdAt: now.toISOString(),
    expiresAt: expiresAt.toISOString(),
    products,
    notes: notes || "",
  }

  quotes.push(newQuote)
  res.status(201).json(newQuote)
})

// Update a quote
app.put("/quotes/:id", authMiddleware, (req, res) => {
  const { products, notes } = req.body
  const quoteIndex = quotes.findIndex((q) => q.id === req.params.id)

  if (quoteIndex === -1) {
    return res.status(404).json({ message: "Quote not found" })
  }

  if (!products || !Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ message: "Products are required" })
  }

  // Update the quote but keep the original id, createdAt, and expiresAt
  quotes[quoteIndex] = {
    ...quotes[quoteIndex],
    products,
    notes: notes || "",
  }

  res.json(quotes[quoteIndex])
})

// Delete a quote
app.delete("/quotes/:id", authMiddleware, (req, res) => {
  const quoteIndex = quotes.findIndex((q) => q.id === req.params.id)

  if (quoteIndex === -1) {
    return res.status(404).json({ message: "Quote not found" })
  }

  quotes.splice(quoteIndex, 1)
  res.status(204).send()
})

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
