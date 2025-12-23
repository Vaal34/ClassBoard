import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'

function ClassCard({ classe }) {
  return (
    <Link key={classe.id} to={`/classe/${classe.path}`} className="group block">
      <div className="corner-superellipse/1.5 bg-card border-border hover:bg-accent hover:text-accent-foreground rounded-xl border p-6 transition-all duration-300 hover:shadow-lg">
        {/* Badge avec nom de classe */}
        <div className="mb-4 text-center">
          <Badge className="corner-superellipse/1.5 font-clash mb-3 px-4 py-2 text-lg">
            {classe.name || 'Classe sans nom'}
          </Badge>
        </div>

        {/* Informations de la classe */}
        <div className="text-center">
          <p className="text-muted-foreground mb-4 text-sm">
            {classe.description || 'Cliquez pour accéder à cette classe'}
          </p>

          {/* Indicateur de navigation */}
          <div className="flex items-center justify-center">
            <div className="text-primary group-hover:text-primary/80 flex items-center transition-colors">
              <span className="mr-2 text-sm font-medium">Accéder</span>
              <svg
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ClassCard
