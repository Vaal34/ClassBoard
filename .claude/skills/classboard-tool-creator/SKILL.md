---
name: classboard-tool-creator
description: This skill should be used when creating new interactive tools for the ClassBoard application's tableau interface. Use this skill when the user requests to add a new classroom tool (like timers, dice, group generators, etc.), needs to scaffold a tool component structure, or wants to follow ClassBoard's established patterns for tool creation. The skill provides templates, styling guidelines, and registration workflows specific to ClassBoard's architecture.
---

# ClassBoard Tool Creator

## Overview

Create new interactive draggable tools for ClassBoard's tableau interface. This skill automates the creation of classroom tools following ClassBoard's architecture patterns, styling conventions, and educational UX principles.

## When to Use This Skill

Use this skill when:
- Creating a new tool for the tableau (minuteur, dé, roue, sondage, etc.)
- User requests a new classroom management feature
- Building interactive components for educational purposes
- Need to follow ClassBoard's established patterns and conventions

## Quick Start Decision Tree

When creating a new tool, first determine the complexity level:

1. **Simple Tool** (like `consigne`) - Static or minimal state
   - Single component file
   - No sub-components
   - Minimal user interaction
   - Use template: `outil-simple.jsx.template`

2. **Stateful Tool** (like `minuteur`) - Complex logic and state
   - Single component with rich state management
   - Multiple hooks (useState, useEffect, custom hooks)
   - May include assets (images, sounds)
   - Use template: `outil-avec-etat.jsx.template`

3. **Multi-View Tool** (like `group`) - Multiple screens/views
   - Parent component managing view state
   - Multiple sub-component files
   - Complex workflows with multiple steps
   - Use template: `outil-multi-vues.jsx.template` + sub-views

## Core Workflow

### Step 1: Understand the Tool Requirements

Ask clarifying questions to understand:
- **Purpose**: What problem does this tool solve in the classroom?
- **Interactions**: How will teachers use it during class?
- **Data needs**: Does it need access to `dataClasse` (student list, class info)?
- **Complexity**: Simple display, stateful logic, or multi-step workflow?
- **Visual requirements**: Size, layout, color emphasis

Example questions:
- "What should happen when the teacher clicks this button?"
- "Do you need to save state between sessions?"
- "Should this tool use the student list from the class?"

### Step 2: Choose the Right Template

Based on requirements, select the appropriate template:

**For simple display tools:**
```
assets/templates/outil-simple.jsx.template
```
Examples: Affichage de consignes, image plein écran, citation du jour

**For interactive tools with state:**
```
assets/templates/outil-avec-etat.jsx.template
```
Examples: Compteur de points, chronomètre, dé à lancer

**For complex multi-step tools:**
```
assets/templates/outil-multi-vues.jsx.template
assets/templates/vue-principale.jsx.template
assets/templates/vue-parametres.jsx.template
```
Examples: Générateur de groupes, sondage avec résultats, roue de la chance avec config

### Step 3: Create the Tool Structure

**File naming convention:** All files and directories must be in French.

**Directory structure:**
```
src/components/tools/
└── [nom-outil]/              # Nom en français (kebab-case)
    ├── [nom-outil].jsx        # Composant principal
    ├── [sous-composant].jsx   # Optionnel
    └── assets/                # Optionnel: images, sons, etc.
```

**Template placeholders to replace:**
- `{{TOOL_NAME_PASCAL}}`: PascalCase component name (ex: `MonOutil`)
- `{{TOOL_DISPLAY_NAME}}`: Display name in French (ex: "Mon Outil")
- `{{TOOL_DESCRIPTION}}`: Brief description of the tool's purpose

**Example:**
```javascript
// src/components/tools/compteur/compteur.jsx
import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

function Compteur({ dataClasse }) {
  const [count, setCount] = useState(0)

  return (
    <Card className="corner-squircle p-6 w-96">
      <h2 className="text-xl font-semibold text-primary">Compteur</h2>
      <p className="text-5xl font-bold text-center my-6">{count}</p>
      <div className="flex gap-2">
        <Button
          onClick={() => setCount(c => c + 1)}
          variant="default"
          className="corner-squircle flex-1"
        >
          +1
        </Button>
        <Button
          onClick={() => setCount(0)}
          variant="outline"
          className="corner-squircle"
        >
          Reset
        </Button>
      </div>
    </Card>
  )
}

export default Compteur
```

### Step 4: Register the Tool in tableau.jsx

**CRITICAL:** A tool must be registered in `tableau.jsx` to be usable on the tableau.

Follow these three registration steps IN ORDER:

**4.1. Import the component** (around line 7):
```javascript
import Compteur from './components/tools/compteur/compteur'
```

**4.2. Add to TOOL_COMPONENTS** (around line 32-39):
```javascript
const TOOL_COMPONENTS = useMemo(
  () => ({
    minuteur: Minuteur,
    consigne: Consigne,
    group: Group,
    compteur: Compteur,  // ← Add here
  }),
  []
)
```

**IMPORTANT:** The key in `TOOL_COMPONENTS` (e.g., `'compteur'`) must match exactly what's used in `addTool('compteur')` calls.

**4.3. Verify the registration:**
- Check that the import path is correct
- Confirm the key matches the tool type string
- Test by adding the tool via the AddItem component

### Step 5: Apply ClassBoard Styling Standards

**Required styling patterns:**

1. **Corner Squircle & Superellipse** - Apply to all Cards and Buttons:
   ```jsx
   <Card className="corner-squircle p-6">
   <Button className="corner-squircle">
   ```

   **Advanced corner styling with variations:**
   ```jsx
   <div className="corner-superellipse/1.5">  {/* Slightly softer corners */}
   <div className="corner-superellipse/3">    {/* Very soft, rounded corners */}
   ```
   Use `corner-superellipse` with fractional values for color pickers, dropdowns, or elements needing softer corners.

2. **Shadcn Components** - Always use these instead of raw HTML:
   - `<Card>` instead of `<div>` for containers
   - `<Button>` instead of `<button>`
   - `<Checkbox>`, `<Select>`, etc. from `@/components/ui/`
   - `<ScrollArea>` for scrollable content (requires wrapper for corner rounding)

3. **Color Variables** - Use CSS variables for theming:
   ```jsx
   <Icon color="var(--primary)" />
   <div className="text-primary bg-card">
   ```

4. **Educational UX** - Optimize for classroom visibility:
   - Large touch targets (buttons min height: `h-12`)
   - Clear visual hierarchy
   - High contrast text
   - Readable from distance (text-xl or larger for key info)
   - Subtle hints with `text-muted-foreground/40` for instructions

**Complete styling example:**
```jsx
<Card className="corner-squircle p-6 w-96 shadow-lg">
  <h2 className="text-xl font-semibold text-primary">Title</h2>

  <div className="flex-1 flex items-center justify-center">
    <p className="text-5xl font-bold tabular-nums text-primary">
      {value}
    </p>
  </div>

  <div className="flex gap-2">
    <Button
      variant="default"
      className="corner-squircle flex-1 h-12"
    >
      Action
    </Button>
  </div>
</Card>
```

**Dropdown/Popup Pattern (Color Pickers, Menus):**

When creating dropdowns or popups that need to appear outside their parent container:

```jsx
{/* Parent toolbar with overflow-visible */}
<div className="flex gap-1.5 p-2 bg-muted/30 rounded-lg corner-squircle overflow-visible">

  {/* Dropdown trigger */}
  <div className="relative">
    <Button
      onClick={() => setShowPicker(!showPicker)}
      variant="outline"
      size="icon"
      className="corner-squircle h-9 w-9"
    >
      <Palette size={16} />
    </Button>

    {/* Popup using fixed positioning to escape container */}
    {showPicker && (
      <div className="fixed mt-2 z-50 p-2 bg-card border rounded-lg grid grid-cols-4 corner-superellipse/3 shadow-lg gap-1">
        {/* Popup content */}
      </div>
    )}
  </div>
</div>
```

**Key techniques:**
- Use `overflow-visible` on parent to allow overflow
- Use `fixed` positioning for popups (not `absolute`)
- Use `grid grid-cols-X` for organized layouts
- Use `corner-superellipse/3` for softer popup corners
- Always include `z-50` for proper layering

**ScrollArea Pattern with Proper Rounding:**

ScrollArea components need a wrapper div for proper corner rounding:

```jsx
{/* Wrapper div with corner-squircle and overflow-hidden */}
<div className="h-[400px] w-full border corner-squircle overflow-hidden">
  <ScrollArea className="h-full w-full">
    <div className="flex flex-col gap-2 p-2">
      {/* Scrollable content */}
    </div>
  </ScrollArea>
</div>
```

**Why this pattern is needed:**
- ScrollArea's internal structure conflicts with direct corner-squircle application
- The wrapper div clips the content to the rounded corners with `overflow-hidden`
- Border must be on wrapper, not ScrollArea

**Rich Text Editor Pattern (TipTap):**

For tools that need rich text editing capabilities (like consigne-riche), use TipTap with proper styling:

```jsx
import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'

const editor = useEditor({
  extensions: [StarterKit, /* other extensions */],
  content: content || '',
  onUpdate: ({ editor }) => {
    onContentChange(editor.getHTML())
  },
})

return (
  <div className="flex-1 min-h-[200px] max-h-[400px] overflow-y-auto p-4 border rounded-lg corner-squircle bg-card focus-within:ring-2 focus-within:ring-primary">
    <style>{`
      .ProseMirror {
        outline: none;
      }
      .ProseMirror p.is-editor-empty:first-child::before {
        content: attr(data-placeholder);
        float: left;
        color: hsl(var(--muted-foreground));
        pointer-events: none;
        height: 0;
      }
    `}</style>
    <EditorContent
      editor={editor}
      className="prose prose-sm max-w-none focus:outline-none"
    />
  </div>
)
```

**TipTap styling best practices:**
- Always add `.ProseMirror { outline: none; }` to remove browser focus outline
- Use `focus-within:ring-2 focus-within:ring-primary` on parent for custom focus indicator
- Add placeholder styles for empty editor state
- Use `prose` classes for content formatting

**Display View Pattern:**

For full-screen display views (presentation mode):

```jsx
<Card className="corner-squircle flex h-full w-full flex-col p-8 gap-2 shadow-lg">
  {/* Header with subtle hints */}
  <div className="flex items-center justify-between">
    <div className="text-muted-foreground/40 text-sm">
      Cliquez sur <Edit size={14} className="inline" /> pour modifier
    </div>
    <div className="flex gap-2">
      {/* Action buttons */}
    </div>
  </div>

  {/* Centered content */}
  <div className="flex flex-1 items-center justify-center">
    <div
      className="prose prose-lg prose-headings:text-primary prose-p:text-foreground w-full max-w-none text-center"
      dangerouslySetInnerHTML={{ __html: content }}
    />
  </div>
</Card>
```

**Key display view patterns:**
- Use `flex h-full w-full flex-col` for full-size Card
- Center content with `flex flex-1 items-center justify-center`
- Add subtle hints with `text-muted-foreground/40`
- Use prose customization: `prose-headings:text-primary prose-p:text-foreground`

### Step 6: Implement Tool-Specific Logic

**Using dataClasse prop:**
Every tool receives `dataClasse` with class information:
```javascript
function MonOutil({ dataClasse }) {
  const { id, nom, niveau, eleves } = dataClasse || {}

  // eleves = [{ id, nom, prenom, ... }, ...]
  const randomStudent = eleves[Math.floor(Math.random() * eleves.length)]
}
```

**State management patterns:**
- Local UI state → `useState`
- Side effects → `useEffect`
- Performance → `useMemo`, `useCallback`
- Server data → TanStack Query hooks (via `useClasse`, etc.)

**Example with student interaction:**
```javascript
function RoueDeLaChance({ dataClasse }) {
  const [spinning, setSpinning] = useState(false)
  const [selectedStudent, setSelectedStudent] = useState(null)

  const handleSpin = () => {
    setSpinning(true)
    setTimeout(() => {
      const random = dataClasse.eleves[
        Math.floor(Math.random() * dataClasse.eleves.length)
      ]
      setSelectedStudent(random)
      setSpinning(false)
    }, 2000)
  }

  return (
    <Card className="corner-squircle p-6">
      {selectedStudent && (
        <p className="text-2xl">
          {selectedStudent.prenom} {selectedStudent.nom}
        </p>
      )}
      <Button
        onClick={handleSpin}
        disabled={spinning}
        className="corner-squircle"
      >
        {spinning ? 'En cours...' : 'Lancer'}
      </Button>
    </Card>
  )
}
```

### Step 7: Test the Tool

**Testing checklist:**
- [ ] Tool appears when added via AddItem component
- [ ] Tool is draggable on the tableau
- [ ] Tool can be brought to front (click to focus)
- [ ] Tool can be removed (X button)
- [ ] All interactions work as expected
- [ ] Styling matches ClassBoard aesthetic (corner-squircle, shadcn)
- [ ] Responsive to different screen sizes
- [ ] No console errors
- [ ] dataClasse prop is received and used correctly (if applicable)

**Common issues:**
1. Tool doesn't appear → Check registration in `TOOL_COMPONENTS`
2. Tool name mismatch → Key in `TOOL_COMPONENTS` must match `addTool('key')`
3. Import errors → Verify file paths are correct (French names)
4. Styling looks off → Missing `corner-squircle` or using wrong components

## Resources

### References

**classboard_patterns.md** - Comprehensive reference for:
- Project structure and architecture
- Tool registration process
- UI/UX standards and styling guidelines
- Data flow patterns
- Performance considerations
- Common pitfalls and best practices

Load this reference when you need detailed information about ClassBoard's architecture or when implementing complex tools.

### Templates

**outil-simple.jsx.template** - Basic tool scaffold
- Minimal state
- Single component
- Perfect for display tools

**outil-avec-etat.jsx.template** - Stateful tool scaffold
- useState, useEffect examples
- Multiple action buttons
- Reset/toggle patterns

**outil-multi-vues.jsx.template** - Multi-view parent component
- View state management
- View switching logic
- Configuration passing

**vue-principale.jsx.template** - Main view sub-component
- Settings button integration
- Content area layout
- Action buttons

**vue-parametres.jsx.template** - Settings view sub-component
- Configuration options with Checkbox
- Back navigation
- Config state management

## Educational Context

ClassBoard tools are designed for classroom use. Consider these factors:

**Visibility** - Teachers need to see tools from across the room
- Use large text (text-xl, text-2xl, text-5xl)
- High contrast colors
- Clear visual feedback

**Speed** - Tools must work instantly during lessons
- No loading states for local operations
- Immediate visual feedback
- Optimized for quick interactions

**Simplicity** - Teachers are busy during class
- One-click operations when possible
- Clear labels in French
- Intuitive icons from lucide-react

**Reliability** - Must work flawlessly every time
- Handle edge cases (empty class, no students selected)
- Provide clear error states
- Graceful fallbacks

## Examples of Common Tools

### Timer/Countdown (Outil avec état)
```javascript
// Uses: react-timer-hook, useState
// Features: Editable time, start/pause, visual feedback
// Template: outil-avec-etat.jsx.template
```

### Random Student Picker (Outil simple)
```javascript
// Uses: dataClasse.eleves, Math.random
// Features: Click to pick, display name, visual animation
// Template: outil-simple.jsx.template
```

### Group Generator (Outil multi-vues)
```javascript
// Uses: Multiple views (settings → results)
// Features: Configure group size, randomize, display groups
// Template: outil-multi-vues.jsx.template
```

### Point Counter (Outil avec état)
```javascript
// Uses: useState for counters, multiple teams
// Features: Increment/decrement, reset, visual score
// Template: outil-avec-etat.jsx.template
```

### Dice Roller (Outil avec état)
```javascript
// Uses: Math.random, animation state
// Features: Roll button, animated result, configurable sides
// Template: outil-avec-etat.jsx.template
```

## Common Patterns

### Pattern: Student Selection
```javascript
const [selectedStudent, setSelectedStudent] = useState(null)

const pickRandom = () => {
  const students = dataClasse?.eleves || []
  if (students.length === 0) return

  const random = students[Math.floor(Math.random() * students.length)]
  setSelectedStudent(random)
}
```

### Pattern: Multi-View with State Management
```javascript
const [currentView, setCurrentView] = useState('edition') // 'edition' | 'affichage' | 'historique'

return (
  <div ref={ref} style={containerStyle}>
    {currentView === 'edition' && (
      <VueEdition
        content={content}
        onContentChange={handleContentChange}
        onShowDisplay={() => setCurrentView('affichage')}
      />
    )}

    {currentView === 'affichage' && (
      <VueAffichage
        content={content}
        onBack={() => setCurrentView('edition')}
      />
    )}

    {currentView === 'historique' && (
      <VueHistorique
        onBack={() => setCurrentView('edition')}
      />
    )}
  </div>
)
```

### Pattern: localStorage Persistence with History
```javascript
const STORAGE_KEY = 'tool-name-history'
const [history, setHistory] = useState([])

// Load from localStorage on mount
useEffect(() => {
  const saved = localStorage.getItem(STORAGE_KEY)
  if (saved) {
    try {
      setHistory(JSON.parse(saved))
    } catch (e) {
      console.error('Error loading history:', e)
    }
  }
}, [])

// Save to localStorage when history changes
useEffect(() => {
  if (history.length > 0) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
  }
}, [history])

// Add to history
const handleSave = () => {
  const newItem = {
    id: Date.now(),
    content: content,
    timestamp: Date.now(),
  }
  setHistory((prev) => [newItem, ...prev])
}
```

### Pattern: Timer/Countdown
```javascript
import { useTimer } from 'react-timer-hook'

const { seconds, minutes, isRunning, pause, resume, restart } = useTimer({
  expiryTimestamp: getExpiryTime(),
  autoStart: false,
  onExpire: () => handleTimerComplete(),
})
```

### Pattern: Resizable Component (Display Mode)
```javascript
const [size, setSize] = useState({ width: 700, height: 400 })
const [isResizing, setIsResizing] = useState(false)

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

// Render resize handle
{currentView === 'affichage' && (
  <div
    onMouseDown={handleMouseDown}
    className="absolute bottom-2 right-2 cursor-se-resize p-1 rounded hover:bg-muted/50 transition-colors"
    style={{ touchAction: 'none' }}
  >
    <Maximize2 size={16} className="text-muted-foreground" />
  </div>
)}
```

### Pattern: Toggle State with Visual Feedback
```javascript
const [isActive, setIsActive] = useState(false)

<Button
  onClick={() => setIsActive(!isActive)}
  variant={isActive ? 'default' : 'white'}
  className="corner-squircle"
>
  {isActive ? 'Désactiver' : 'Activer'}
</Button>
```

## Final Checklist

Before completing a tool, verify:

- [ ] File and directory names are in French
- [ ] Component is exported as default
- [ ] Tool is imported in `tableau.jsx`
- [ ] Tool is registered in `TOOL_COMPONENTS`
- [ ] All UI uses shadcn components
- [ ] `corner-squircle` class applied to Card and Buttons
- [ ] Colors use CSS variables (`var(--primary)`, etc.)
- [ ] Text is large enough for classroom visibility
- [ ] Tool handles edge cases (empty data, errors)
- [ ] No console errors or warnings
- [ ] Tool is tested in draggable context
