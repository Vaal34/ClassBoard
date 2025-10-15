import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'

function ClassCard({ classe }) {
  return (
    <Link
      key={classe.id}
      to={`/classe/${classe.id}`}
      className="group block"
    >
      <div className="bg-card border border-border rounded-xl p-6 hover:bg-accent hover:text-accent-foreground transition-all duration-300 hover:shadow-lg">
        {/* Badge avec nom de classe */}
        <div className="text-center mb-4">
          <Badge className="font-clash text-lg px-4 py-2 mb-3">
            {classe.name || 'Classe sans nom'}
          </Badge>
        </div>

        {/* Informations de la classe */}
        <div className="text-center">
          <p className="text-muted-foreground text-sm mb-4">
            {classe.description || 'Cliquez pour accéder à cette classe'}
          </p>

          {/* Indicateur de navigation */}
          <div className="flex items-center justify-center">
            <div className="flex items-center text-primary group-hover:text-primary/80 transition-colors">
              <span className="text-sm font-medium mr-2">Accéder</span>
              <svg 
                className="w-4 h-4 group-hover:translate-x-1 transition-transform" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ClassCard
