import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ===========================================
// CONTRÔLEURS POUR LES CLASSES
// ===========================================

// Récupérer toutes les classes
export const getAllClasses = async (req, res) => {
  try {
    const classes = await prisma.classe.findMany({
      include: { eleves: true },
    })
    res.json(classes)
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des classes' })
  }
}

// Récupérer une classe par son path
export const getClassByPath = async (req, res) => {
  try {
    const { path } = req.params
    const classe = await prisma.classe.findUnique({
      where: { path },
      include: { eleves: true },
    })
    
    if (!classe) {
      return res.status(404).json({ error: 'Classe non trouvée' })
    }
    
    res.json(classe)
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de la classe' })
  }
}

// Créer une nouvelle classe
export const createClass = async (req, res) => {
  try {
    if (req.body == undefined) {
      return res.status(400).json({ error: 'Données manquantes' })
    }

    const { name, path } = req.body

    if (!name || !path) {
      return res.status(400).json({ error: 'Nom et path requis' })
    }

    const newClasse = await prisma.classe.create({
      data: {
        name,
        path,
      },
    })

    res.status(201).json(newClasse)
  } catch (error) {
    if (error.code === 'P2002') {
      res.status(409).json({ error: 'Une classe avec ce path existe déjà' })
    } else {
      res.status(500).json({ error: 'Erreur lors de la création de la classe' })
    }
  }
}


// Supprimer une classe
export const deleteClass = async (req, res) => {
  try {
    const { id } = req.body

    if (!id) {
      return res.status(400).json({ error: 'ID de classe requis' })
    }

    const deleteClasse = await prisma.classe.delete({
      where: { id: parseInt(id) },
    })

    res.status(200).json(deleteClasse)
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Classe non trouvée' })
    } else {
      res.status(500).json({ error: 'Erreur lors de la suppression de la classe' })
    }
  }
}
