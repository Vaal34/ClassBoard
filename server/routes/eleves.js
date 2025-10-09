import express from 'express'
import {
  getAllEleves,
  createEleve,
  updateEleve,
  deleteEleves
} from '../controllers/eleveController.js'

const router = express.Router()

// ===========================================
// ROUTES POUR LES ÉLÈVES /api/eleves
// ===========================================

// GET - Récupérer tous les élèves
router.get('/', getAllEleves)

// POST - Créer un nouvel élève dans une classe spécifique
router.post('/:path', createEleve)

// PUT - Mettre à jour un élève (avec changement de classe possible)
router.put('/:id', updateEleve)

// DELETE - Supprimer plusieurs élèves
router.delete('/', deleteEleves)

export default router
