import express from 'express'
import cors from 'cors'
import routes from './routes/index.js'

const app = express()

// ===========================================
// MIDDLEWARES GLOBAUX
// ===========================================
app.use(cors())
app.use(express.json())

// ===========================================
// ROUTES
// ===========================================
app.use('/', routes)

// ===========================================
// ROUTE DE SANTÉ
// ===========================================
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    message: 'Serveur ClassBoard opérationnel',
    timestamp: new Date().toISOString()
  })
})

// ===========================================
// DÉMARRAGE DU SERVEUR
// ===========================================
const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`🚀 Serveur ClassBoard démarré sur http://localhost:${PORT}`)
  console.log(`📊 Santé du serveur: http://localhost:${PORT}/health`)
})
