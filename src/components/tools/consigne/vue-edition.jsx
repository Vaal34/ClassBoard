import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useEditor, EditorContent } from '@tiptap/react'
import { StarterKit } from '@tiptap/starter-kit'
import { TextStyle } from '@tiptap/extension-text-style'
import { Color } from '@tiptap/extension-color'
import { Underline } from '@tiptap/extension-underline'
import { Placeholder } from '@tiptap/extension-placeholder'
import { TextAlign } from '@tiptap/extension-text-align'
import { FontSize } from './font-size-extension'
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Eye,
  History as HistoryIcon,
  Palette,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  AArrowDown,
  AArrowUp
} from 'lucide-react'
import { useState } from 'react'

/**
 * Vue d'édition de la consigne avec éditeur de texte riche
 */
export function VueEdition({ content, onContentChange, onShowDisplay, onShowHistory }) {
  const [currentFontSize, setCurrentFontSize] = useState(16) // Taille en pixels
  const [showColorPicker, setShowColorPicker] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Underline,
      FontSize,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
        alignments: ['left', 'center', 'right', 'justify'],
      }),
      Placeholder.configure({
        placeholder: 'Écrivez votre consigne ici...',
      }),
    ],
    content: content || '',
    onUpdate: ({ editor }) => {
      onContentChange(editor.getHTML())
    },
  })

  if (!editor) {
    return null
  }

  const colors = [
    '#000000', // Noir
    '#FF0000', // Rouge
    '#0000FF', // Bleu
    '#00FF00', // Vert
    '#FFA500', // Orange
    '#800080', // Violet
    '#FFFF00', // Jaune
    '#FFFFFF', // Blanc
  ]

  const increaseFontSize = () => {
    const newSize = Math.min(currentFontSize + 2, 60) // Max 60px
    setCurrentFontSize(newSize)
    editor.chain().focus().setFontSize(`${newSize}px`).run()
  }

  const decreaseFontSize = () => {
    const newSize = Math.max(currentFontSize - 2, 10) // Min 10px
    setCurrentFontSize(newSize)
    editor.chain().focus().setFontSize(`${newSize}px`).run()
  }

  return (
    <Card className="corner-squircle p-6 w-[485px] flex flex-col gap-4 shadow-lg">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-primary">
          Éditer la consigne
        </h2>
        <Button
          onClick={onShowHistory}
          variant="outline"
          size="icon"
          className="corner-squircle"
        >
          <HistoryIcon size={16} />
        </Button>
      </div>

      {/* Toolbar de formatage */}
      <div className="flex gap-1.5 p-2 bg-muted/30 rounded-lg corner-squircle overflow-visible">
        {/* Formatage de texte */}
        <div className="flex gap-1">
          <Button
            onClick={() => editor.chain().focus().toggleBold().run()}
            variant={editor.isActive('bold') ? 'default' : 'outline'}
            size="icon"
            className="corner-squircle h-9 w-9"
          >
            <Bold size={16} />
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            variant={editor.isActive('italic') ? 'default' : 'outline'}
            size="icon"
            className="corner-squircle h-9 w-9"
          >
            <Italic size={16} />
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            variant={editor.isActive('underline') ? 'default' : 'outline'}
            size="icon"
            className="corner-squircle h-9 w-9"
          >
            <UnderlineIcon size={16} />
          </Button>
        </div>

        <div className="h-9 w-px bg-border" />

        {/* Taille de texte */}
        <div className="flex gap-1">
          <Button
            onClick={decreaseFontSize}
            variant="outline"
            size="icon"
            className="corner-squircle h-9 w-9"
            title="Diminuer la taille"
          >
            <AArrowDown size={16} />
          </Button>
          <Button
            onClick={increaseFontSize}
            variant="outline"
            size="icon"
            className="corner-squircle h-9 w-9"
            title="Augmenter la taille"
          >
            <AArrowUp size={16} />
          </Button>
        </div>

        <div className="h-9 w-px bg-border" />

        {/* Alignement de texte */}
        <div className="flex gap-1">
          <Button
            onClick={() => editor.chain().focus().setTextAlign('left').run()}
            variant={editor.isActive({ textAlign: 'left' }) ? 'default' : 'outline'}
            size="icon"
            className="corner-squircle h-9 w-9"
          >
            <AlignLeft size={16} />
          </Button>
          <Button
            onClick={() => editor.chain().focus().setTextAlign('center').run()}
            variant={editor.isActive({ textAlign: 'center' }) ? 'default' : 'outline'}
            size="icon"
            className="corner-squircle h-9 w-9"
          >
            <AlignCenter size={16} />
          </Button>
          <Button
            onClick={() => editor.chain().focus().setTextAlign('right').run()}
            variant={editor.isActive({ textAlign: 'right' }) ? 'default' : 'outline'}
            size="icon"
            className="corner-squircle h-9 w-9"
          >
            <AlignRight size={16} />
          </Button>
          <Button
            onClick={() => editor.chain().focus().setTextAlign('justify').run()}
            variant={editor.isActive({ textAlign: 'justify' }) ? 'default' : 'outline'}
            size="icon"
            className="corner-squircle h-9 w-9"
          >
            <AlignJustify size={16} />
          </Button>
        </div>

        <div className="h-9 w-px bg-border" />

        {/* Couleurs */}
        <div className="relative">
          <Button
            onClick={() => setShowColorPicker(!showColorPicker)}
            variant="outline"
            size="icon"
            className="corner-squircle h-9 w-9"
          >
            <Palette size={16} />
          </Button>

          {showColorPicker && (
            <div className="fixed mt-2 z-50 p-2 bg-card border rounded-lg grid grid-cols-4 corner-superellipse/3 shadow-lg gap-1 flex-wrap">
              {colors.map((color) => (
                <Button
                  key={color}
                  onClick={() => {
                    editor.chain().focus().setColor(color).run()
                    setShowColorPicker(false)
                  }}
                  className="w-8 h-8 rounded-lg border border-black corner-squircle hover:scale-110 transition-transform"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Éditeur */}
      <div
        className="flex-1 min-h-[200px] max-h-[300px] overflow-y-auto p-4 border rounded-lg corner-squircle bg-card focus-within:ring-2 focus-within:ring-primary"
      >
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

      {/* Actions */}
      <div className="flex gap-2">
        <Button
          onClick={onShowDisplay}
          variant="default"
          className="corner-squircle flex-1 h-12"
        >
          <Eye size={16} className="mr-2" />
          Afficher à la classe
        </Button>
      </div>
    </Card>
  )
}
