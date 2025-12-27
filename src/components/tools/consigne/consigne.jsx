import { useState, useEffect } from 'react'
import { VueEdition } from './vue-edition'
import { VueAffichage } from './vue-affichage'
import { VueHistorique } from './vue-historique'
import useMeasure from 'react-use-measure'
import { Maximize2 } from 'lucide-react'

/**
 * Outil de consigne enrichie avec éditeur de texte riche
 * Permet de créer, formater et afficher des consignes à la classe
 * Supporte l'historique et le redimensionnement
 *
 * @param {Object} dataClasse - Données de la classe (non utilisé ici mais disponible)
 */
function Consigne({ dataClasse }) {
  const [currentView, setCurrentView] = useState('edition')
  const [content, setContent] = useState('')
  const [history, setHistory] = useState([])
  const [ref, bounds] = useMeasure()
  const [size, setSize] = useState({ width: 700, height: 400 })
  const [isResizing, setIsResizing] = useState(false)

  const STORAGE_KEY = 'consigne-riche-history'

  // Charger l'historique depuis localStorage au montage
  useEffect(() => {
    const savedHistory = localStorage.getItem(STORAGE_KEY)
    if (savedHistory) {
      try {
        setHistory(JSON.parse(savedHistory))
      } catch (e) {
        console.error('Erreur lors du chargement de l\'historique:', e)
      }
    }
  }, [])

  // Sauvegarder l'historique dans localStorage
  useEffect(() => {
    if (history.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
    }
  }, [history])

  const handleContentChange = (newContent) => {
    setContent(newContent)
  }

  const handleSaveToHistory = () => {
    if (!content) return

    const newHistoryItem = {
      id: Date.now(),
      content: content,
      timestamp: Date.now(),
    }

    setHistory((prev) => [newHistoryItem, ...prev])
  }

  const handleLoadFromHistory = (historyContent) => {
    setContent(historyContent)
    setCurrentView('edition')
  }

  const handleDeleteFromHistory = (id) => {
    setHistory((prev) => prev.filter((item) => item.id !== id))
  }

  const handleShowDisplay = () => {
    setCurrentView('affichage')
  }

  const handleShowHistory = () => {
    setCurrentView('historique')
  }

  const handleBackToEdition = () => {
    setCurrentView('edition')
  }

  // Gestion du redimensionnement
  const handleMouseDown = (e) => {
    e.preventDefault()
    setIsResizing(true)

    const startX = e.clientX
    const startY = e.clientY
    const startWidth = size.width
    const startHeight = size.height

    const handleMouseMove = (e) => {
      const deltaX = e.clientX - startX
      const deltaY = e.clientY - startY

      setSize({
        width: Math.max(400, startWidth + deltaX),
        height: Math.max(300, startHeight + deltaY),
      })
    }

    const handleMouseUp = () => {
      setIsResizing(false)
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseup', handleMouseUp)
  }

  // Styles pour le conteneur redimensionnable
  const containerStyle = {
    width: currentView === 'affichage' ? `${size.width}px` : 'auto',
    height: currentView === 'affichage' ? `${size.height}px` : 'auto',
    position: 'relative',
    transition: isResizing ? 'none' : 'all 0.3s ease',
  }

  return (
    <div ref={ref} style={containerStyle}>
      {currentView === 'edition' && (
        <VueEdition
          content={content}
          onContentChange={handleContentChange}
          onShowDisplay={handleShowDisplay}
          onShowHistory={handleShowHistory}
        />
      )}

      {currentView === 'affichage' && (
        <VueAffichage
          content={content}
          onBack={handleBackToEdition}
          onSaveToHistory={handleSaveToHistory}
        />
      )}

      {currentView === 'historique' && (
        <VueHistorique
          history={history}
          onBack={handleBackToEdition}
          onLoadFromHistory={handleLoadFromHistory}
          onDeleteFromHistory={handleDeleteFromHistory}
        />
      )}

      {/* Poignée de redimensionnement (seulement en mode affichage) */}
      {currentView === 'affichage' && (
        <div
          onMouseDown={handleMouseDown}
          className="absolute bottom-2 right-2 cursor-se-resize p-1 rounded hover:bg-muted/50 transition-colors"
          style={{ touchAction: 'none' }}
        >
          <Maximize2 size={16} className="text-muted-foreground" />
        </div>
      )}
    </div>
  )
}

export default Consigne
