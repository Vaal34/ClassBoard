import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'motion/react'
import { Checkbox } from '@/components/ui/checkbox'
import { cn } from '@/lib/utils'

const AnimatedItem = ({
  children,
  delay = 0,
  index,
  onMouseEnter,
  onClick,
}) => {
  const ref = useRef(null)
  const inView = useInView(ref, { amount: 0.5, triggerOnce: false })
  return (
    <motion.div
      ref={ref}
      data-index={index}
      onMouseEnter={onMouseEnter}
      onClick={onClick}
      initial={{ scale: 0.7, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : { scale: 0.7, opacity: 0 }}
      transition={{ duration: 0.2, delay }}
      style={{ marginBottom: '0.5rem', cursor: 'pointer' }}
    >
      {children}
    </motion.div>
  )
}

const AnimatedList = ({
  items = [
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 6',
    'Item 7',
    'Item 8',
    'Item 9',
    'Item 10',
    'Item 11',
    'Item 12',
    'Item 13',
    'Item 14',
    'Item 15',
  ],
  onItemSelect,
  showGradients = true,
  enableArrowNavigation = true,
  className = '',
  itemClassName = '',
  displayScrollbar = true,
  initialSelectedIndex = -1,
  isChecked,
}) => {
  const listRef = useRef(null)
  const [selectedIndex, setSelectedIndex] = useState(initialSelectedIndex)
  const [keyboardNav, setKeyboardNav] = useState(false)
  const [topGradientOpacity, setTopGradientOpacity] = useState(0)
  const [bottomGradientOpacity, setBottomGradientOpacity] = useState(1)

  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target
    setTopGradientOpacity(Math.min(scrollTop / 50, 1))
    const bottomDistance = scrollHeight - (scrollTop + clientHeight)
    setBottomGradientOpacity(
      scrollHeight <= clientHeight ? 0 : Math.min(bottomDistance / 50, 1)
    )
  }

  useEffect(() => {
    if (!enableArrowNavigation) return
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || (e.key === 'Tab' && !e.shiftKey)) {
        e.preventDefault()
        setKeyboardNav(true)
        setSelectedIndex((prev) => Math.min(prev + 1, items.length - 1))
      } else if (e.key === 'ArrowUp' || (e.key === 'Tab' && e.shiftKey)) {
        e.preventDefault()
        setKeyboardNav(true)
        setSelectedIndex((prev) => Math.max(prev - 1, 0))
      } else if (e.key === 'Enter') {
        if (selectedIndex >= 0 && selectedIndex < items.length) {
          e.preventDefault()
          if (onItemSelect) {
            onItemSelect(items[selectedIndex], selectedIndex)
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [items, selectedIndex, onItemSelect, enableArrowNavigation])

  useEffect(() => {
    if (!keyboardNav || selectedIndex < 0 || !listRef.current) return
    const container = listRef.current
    const selectedItem = container.querySelector(
      `[data-index="${selectedIndex}"]`
    )
    if (selectedItem) {
      const extraMargin = 50
      const containerScrollTop = container.scrollTop
      const containerHeight = container.clientHeight
      const itemTop = selectedItem.offsetTop
      const itemBottom = itemTop + selectedItem.offsetHeight
      if (itemTop < containerScrollTop + extraMargin) {
        container.scrollTo({ top: itemTop - extraMargin, behavior: 'smooth' })
      } else if (
        itemBottom >
        containerScrollTop + containerHeight - extraMargin
      ) {
        container.scrollTo({
          top: itemBottom - containerHeight + extraMargin,
          behavior: 'smooth',
        })
      }
    }
    setKeyboardNav(false)
  }, [selectedIndex, keyboardNav])

  return (
    <div className={`h-full ${className}`}>
      <div
        ref={listRef}
        className={`h-full max-h-96 overflow-y-auto rounded-2xl ${!displayScrollbar ? 'scrollbar-hide' : 'scrollbar-custom'}`}
        onScroll={handleScroll}
      >
        {items.map((item, index) => {
          // Utiliser uniqueId s'il existe, sinon utiliser id
          const itemId = item.uniqueId || item.id

          return (
            <AnimatedItem
              key={itemId}
              delay={0.1}
              index={index}
              onMouseEnter={() => setSelectedIndex(index)}
              onClick={(e) => {
                // Empêcher la sélection si on clique sur la checkbox
                if (
                  e.target.closest('.check') ||
                  e.target.type === 'checkbox'
                ) {
                  return
                }
                setSelectedIndex(index)
                if (onItemSelect) {
                  onItemSelect(item, index)
                }
              }}
            >
              <div
                className={cn(
                  "item-list flex cursor-pointer items-center justify-between rounded-2xl bg-card p-4 shadow-md",
                  selectedIndex === index && "bg-muted-foreground/20",
                  itemClassName
                )}
              >
                <label
                  htmlFor={`cbx-${itemId}`}
                  className="flex items-center gap-3 flex-1 cursor-pointer"
                >
                  <Checkbox
                    id={`cbx-${itemId}`}
                    checked={item.checked}
                    onCheckedChange={() => isChecked(itemId)}
                    className="check"
                  />
                  <span
                    className={cn(
                      "ease m-0 font-medium capitalize transition-colors duration-300",
                      !item.checked && "text-muted-foreground line-through"
                    )}
                  >
                    {item.prenom} {item.nom}
                  </span>
                </label>
              </div>
            </AnimatedItem>
          )
        })}
      </div>
      {showGradients && (
        <>
          <div
            className="ease pointer-events-none absolute top-0 right-0 left-0 h-12 bg-gradient-to-b from-gray-900 to-transparent transition-opacity duration-300"
            style={{ opacity: topGradientOpacity }}
          ></div>
          <div
            className="ease pointer-events-none absolute right-0 bottom-0 left-0 h-24 bg-gradient-to-t from-gray-900 to-transparent transition-opacity duration-300"
            style={{ opacity: bottomGradientOpacity }}
          ></div>
        </>
      )}
    </div>
  )
}

export default AnimatedList
