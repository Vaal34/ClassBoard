import express from 'express'
import {
  getAllClasses,
  getClassByPath,
  createClass,
  deleteClass,
} from '../controllers/classController.js'

const router = express.Router()

// ===========================================
// ROUTES POUR LES CLASSES /api/classes
// ===========================================

// GET - Récupérer toutes les classes
router.get('/', getAllClasses)

// GET - Récupérer une classe par son path
router.get('/:path', getClassByPath)

// POST - Créer une nouvelle classe
router.post('/', createClass)

// DELETE - Supprimer une classe
router.delete('/', deleteClass)

export default router
