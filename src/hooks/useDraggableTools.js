import { useState, useEffect, useCallback } from 'react'
import { v4 as uuidv4 } from 'uuid'

/**
 * Hook personnalisé pour gérer les outils draggables sur le tableau
 * @param {string} classePath - Chemin de la classe pour le stockage unique
 * @returns {Object} - État et fonctions de gestion des outils
 */
export function useDraggableTools(classePath) {
  const [toolsList, setToolsList] = useState([])
  const [activeId, setActiveId] = useState(null)
  const [maxZIndex, setMaxZIndex] = useState(1)

  const storageKey = `tableau-tools-${classePath}`

  // Charger les outils depuis localStorage
  useEffect(() => {
    const savedTools = localStorage.getItem(storageKey)
    if (savedTools) {
      try {
        const parsed = JSON.parse(savedTools)
        setToolsList(parsed.tools || [])
        setMaxZIndex(parsed.maxZIndex || 1)
      } catch (e) {
        console.error('Erreur lors du chargement des outils:', e)
      }
    }
  }, [storageKey])

  // Sauvegarder les outils dans localStorage
  useEffect(() => {
    if (toolsList.length > 0 || maxZIndex > 1) {
      localStorage.setItem(
        storageKey,
        JSON.stringify({ tools: toolsList, maxZIndex })
      )
    }
  }, [toolsList, maxZIndex, storageKey])

  // Ajouter un nouvel outil
  const addTool = useCallback(
    (type) => {
      const newZIndex = maxZIndex + 1
      const newTool = {
        id: uuidv4(),
        top: 200,
        left: 200,
        type: type,
        zIndex: newZIndex,
      }
      setToolsList((prev) => [...prev, newTool])
      setMaxZIndex(newZIndex)
    },
    [maxZIndex]
  )

  // Supprimer un outil
  const removeTool = useCallback((id) => {
    setToolsList((prev) => prev.filter((tool) => tool.id !== id))
  }, [])

  // Mettre au premier plan
  const focusTool = useCallback(
    (id) => {
      const newZIndex = maxZIndex + 1
      setToolsList((prev) =>
        prev.map((tool) =>
          tool.id === id ? { ...tool, zIndex: newZIndex } : tool
        )
      )
      setMaxZIndex(newZIndex)
    },
    [maxZIndex]
  )

  // Gérer le début du drag
  const handleDragStart = useCallback((event) => {
    setActiveId(event.active.id)
  }, [])

  // Gérer la fin du drag
  const handleDragEnd = useCallback((event) => {
    setActiveId(null)
    setToolsList((prev) =>
      prev.map((tool) => {
        if (tool.id === event.active.id) {
          return {
            ...tool,
            top: tool.top + event.delta.y,
            left: tool.left + event.delta.x,
          }
        }
        return tool
      })
    )
  }, [])

  // Effacer tous les outils
  const clearAllTools = useCallback(() => {
    setToolsList([])
    setMaxZIndex(1)
    localStorage.removeItem(storageKey)
  }, [storageKey])

  return {
    toolsList,
    activeId,
    addTool,
    removeTool,
    focusTool,
    handleDragStart,
    handleDragEnd,
    clearAllTools,
  }
}
