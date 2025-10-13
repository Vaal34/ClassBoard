import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// ===========================================
// CONTRÔLEURS POUR LES ÉLÈVES
// ===========================================

// Récupérer tous les élèves
export const getAllEleves = async (req, res) => {
  try {
    const eleves = await prisma.eleve.findMany({
      include: { classe: true },
      orderBy: {
        classeId: 'asc',
      },
    })
    res.status(200).json(eleves)
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des élèves' })
  }
}

// Créer un nouvel élève dans une classe
export const createEleve = async (req, res) => {
  try {
    const { path } = req.params
    const { prenom, nom } = req.body

    if (!prenom || !nom) {
      return res.status(400).json({ error: 'Prénom et nom requis' })
    }

    const classe = await prisma.classe.findUnique({
      where: { path },
    })

    if (!classe) {
      return res.status(404).json({ error: 'Classe non trouvée' })
    }

    const newEleve = await prisma.eleve.create({
      data: {
        prenom,
        nom,
        classeId: parseInt(classe.id),
      },
    })

    res.status(201).json(newEleve)
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la création de l'élève" })
  }
}

// Mettre à jour un élève (avec changement de classe possible)
export const updateEleve = async (req, res) => {
  try {
    const { id } = req.params
    const { prenom, nom, classeId } = req.body

    if (!prenom || !nom) {
      return res.status(400).json({ error: 'Prénom et nom requis' })
    }

    const updatedEleve = await prisma.eleve.update({
      where: { id: Number(id) },
      data: {
        prenom,
        nom,
        classeId: classeId ? Number(classeId) : undefined,
      },
    })

    res.status(200).json(updatedEleve)
  } catch (error) {
    if (error.code === 'P2025') {
      res.status(404).json({ error: 'Élève non trouvé' })
    } else if (error.code === 'P2003') {
      res.status(400).json({ error: 'Classe invalide' })
    } else {
      res
        .status(500)
        .json({ error: "Erreur lors de la mise à jour de l'élève" })
    }
  }
}

// Supprimer plusieurs élèves
export const deleteEleves = async (req, res) => {
  try {
    const { ids } = req.body

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return res.status(400).json({ error: "Liste d'IDs d'élèves requise" })
    }

    const deleteResult = await prisma.eleve.deleteMany({
      where: {
        id: { in: ids.map((id) => parseInt(id)) },
      },
    })

    res.status(200).json({
      message: `${deleteResult.count} élève(s) supprimé(s)`,
      count: deleteResult.count,
    })
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression des élèves' })
  }
}
