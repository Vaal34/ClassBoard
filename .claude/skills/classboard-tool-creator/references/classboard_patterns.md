# ClassBoard Architecture & Patterns

## Project Structure

```
src/
├── components/
│   ├── tools/               # Outils draggables pour le tableau
│   │   ├── minuteur/       # Exemple d'outil complexe
│   │   ├── consigne/       # Exemple d'outil simple
│   │   └── group/          # Exemple d'outil avec sous-composants
│   ├── ui/                 # Composants shadcn/ui
│   └── draggable/          # Wrapper draggable
├── hooks/                  # Custom hooks
└── tableau.jsx             # Composant principal
```

## Tool Architecture

### 1. Tool Component Structure

Chaque outil suit cette structure :

```
src/components/tools/nom-outil/
├── nom-outil.jsx           # Composant principal (OBLIGATOIRE)
├── sous-composant-1.jsx    # Optionnel
├── sous-composant-2.jsx    # Optionnel
└── assets/                 # Images, fichiers (optionnel)
    ├── image1.png
    └── image2.jpg
```

### 2. Tool Registration Process

Pour qu'un outil soit utilisable sur le tableau, il faut :

**Étape 1 : Créer le composant**
```javascript
// src/components/tools/mon-outil/mon-outil.jsx
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

function MonOutil({ dataClasse }) {
  return (
    <Card className="corner-squircle p-6">
      {/* Contenu de l'outil */}
    </Card>
  )
}

export default MonOutil
```

**Étape 2 : Importer dans tableau.jsx**
```javascript
// src/tableau.jsx (ligne ~7)
import MonOutil from './components/tools/mon-outil/mon-outil'
```

**Étape 3 : Enregistrer dans TOOL_COMPONENTS**
```javascript
// src/tableau.jsx (ligne ~32-39)
const TOOL_COMPONENTS = useMemo(
  () => ({
    minuteur: Minuteur,
    consigne: Consigne,
    group: Group,
    'mon-outil': MonOutil,  // Ajouter ici
  }),
  []
)
```

**Note importante :** La clé dans `TOOL_COMPONENTS` doit correspondre au `type` utilisé dans `addTool('mon-outil')`.

## UI/UX Standards

### Design Principles

1. **Corner Squircle Styling**
   - Tous les outils utilisent `corner-squircle` pour une cohérence visuelle
   - Appliqué via className : `className="corner-squircle"`

2. **Shadcn Components**
   - Utiliser les composants de `@/components/ui/` (Card, Button, etc.)
   - Variants disponibles : `default`, `white`, `outline`, etc.

3. **Responsive & Adaptable**
   - Les outils doivent s'adapter à différentes tailles d'écran
   - Utiliser Tailwind pour le responsive design

### Common Patterns

#### Composant de base (Simple)
```jsx
import { Card } from '@/components/ui/card'

function OutilSimple({ dataClasse }) {
  return (
    <Card className="corner-squircle p-6 w-96 h-48">
      {/* Contenu */}
    </Card>
  )
}
```

#### Composant avec état (Complexe)
```jsx
import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

function OutilComplexe({ dataClasse }) {
  const [state, setState] = useState(initialValue)

  const handleAction = () => {
    // Logique
  }

  return (
    <Card className="corner-squircle p-6">
      <Button
        onClick={handleAction}
        variant="default"
        className="corner-squircle"
      >
        Action
      </Button>
    </Card>
  )
}
```

#### Composant avec sous-composants
```jsx
import { useState } from 'react'
import SousComposant1 from './sous-composant-1'
import SousComposant2 from './sous-composant-2'

function OutilAvecSousComposants({ dataClasse }) {
  const [view, setView] = useState('view1')

  return (
    <>
      {view === 'view1' ? (
        <SousComposant1 onSwitch={() => setView('view2')} />
      ) : (
        <SousComposant2 onSwitch={() => setView('view1')} />
      )}
    </>
  )
}
```

## Data Flow

### Props communes

Tous les outils reçoivent automatiquement :
- `dataClasse` : Objet contenant les données de la classe
  ```javascript
  {
    id: number,
    nom: string,
    niveau: string,
    eleves: [
      { id: number, nom: string, prenom: string, ... }
    ]
  }
  ```

### État local vs Global

- **État UI de l'outil** → `useState` local
- **Données de la classe** → Hook `useClasse(classePath)`
- **Position/Z-index de l'outil** → Géré par `useDraggableTools`

## Styling Guidelines

### Tailwind Classes

**Spacing :**
- Padding standard : `p-4` ou `p-6`
- Gaps : `gap-2`, `gap-3`, `gap-4`

**Colors :**
- Primary : `bg-primary`, `text-primary`
- Background : `bg-background`, `bg-card`
- Muted : `text-muted-foreground`

**Layout :**
- Flexbox : `flex`, `items-center`, `justify-center`
- Grid : `grid`, `grid-cols-2`

### Shadcn Components Standards

**Card :**
```jsx
<Card className="corner-squircle p-6 shadow-lg">
  {/* Contenu */}
</Card>
```

**Button :**
```jsx
<Button
  variant="default"  // ou "white", "outline"
  className="corner-squircle"
>
  Texte
</Button>
```

**Icons (lucide-react) :**
```jsx
import { Play, Pause, Settings } from 'lucide-react'

<Play
  size={16}
  color="var(--primary)"
  fill="var(--primary)"  // optionnel
/>
```

## Educational Context

### Outils pensés pour l'enseignement

Les outils doivent être :
1. **Intuitifs** - Faciles à utiliser en classe
2. **Visuellement clairs** - Visibles par les élèves
3. **Rapides** - Pas de latence pendant le cours
4. **Pédagogiques** - Aident à la gestion de classe

### Exemples de cas d'usage

- **Minuteur** : Timer pour les activités chronométrées
- **Consigne** : Afficher les instructions à toute la classe
- **Group** : Générer des groupes d'élèves aléatoires
- **Roue** : Tirage au sort d'élèves
- **Tableau de points** : Compétition par équipes
- **Chronomètre** : Mesurer le temps d'activité
- **Dé** : Lancer de dés pour des jeux éducatifs
- **Sondage** : Votes rapides en classe

## Performance Considerations

### Optimisations

1. **useMemo pour les objets constants**
   ```jsx
   const TOOL_COMPONENTS = useMemo(() => ({ ... }), [])
   ```

2. **useCallback pour les fonctions**
   ```jsx
   const handleAction = useCallback(() => { ... }, [deps])
   ```

3. **Lazy loading pour les images lourdes**
   ```jsx
   <img loading="lazy" src={image} alt="..." />
   ```

## Common Pitfalls

### À éviter

1. ❌ Oublier d'enregistrer l'outil dans `TOOL_COMPONENTS`
2. ❌ Utiliser des noms de fichiers en anglais (doivent être en français)
3. ❌ Ne pas respecter le style `corner-squircle`
4. ❌ Créer des composants trop complexes (diviser en sous-composants)
5. ❌ Oublier la prop `dataClasse`

### Bonnes pratiques

1. ✅ Nommer les fichiers/dossiers en français
2. ✅ Utiliser les composants shadcn existants
3. ✅ Appliquer `corner-squircle` pour la cohérence
4. ✅ Tester l'outil dans le contexte du tableau draggable
5. ✅ Penser à l'UX en classe (gros boutons, visibilité)
