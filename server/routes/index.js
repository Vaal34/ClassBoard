import express from 'express'
import classesRoutes from './classes.js'
import elevesRoutes from './eleves.js'

const router = express.Router()

// ===========================================
// REGROUPEMENT DE TOUTES LES ROUTES
// ===========================================

// Routes pour les classes
router.use('/api/classes', classesRoutes)

// Routes pour les élèves
router.use('/api/eleves', elevesRoutes)

export default router
