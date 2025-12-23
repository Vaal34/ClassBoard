'use client'

import * as React from 'react'
import { motion } from 'motion/react'
import { SlidingNumber } from '@/components/ui/sliding-number'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Minus, Plus } from 'lucide-react'

export default function Counter({
  number,
  setNumber,
  className,
  slidingNumberProps,
  buttonProps,
  transition = { type: 'spring', bounce: 0, stiffness: 300, damping: 30 },
  ...props
}) {
  return (
    <motion.div
      data-slot="counter"
      layout
      transition={transition}
      className={cn(
        'flex items-center gap-x-2 rounded-xl bg-neutral-100 dark:bg-neutral-800',
        className
      )}
      {...props}
    >
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          size="icon"
          {...buttonProps}
          onClick={() => setNumber(number - 1)}
          className={cn(
            'bg-white hover:bg-white/70 dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-950/70',
            buttonProps?.className
          )}
        >
          <Minus className="text-primary" />
        </Button>
      </motion.div>

      <SlidingNumber
        number={number}
        {...slidingNumberProps}
        className={cn('text-lg mask-t-from-85% mask-b-from-85%', slidingNumberProps?.className)}
      />

      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          size="icon"
          {...buttonProps}
          onClick={() => setNumber(number + 1)}
          className={cn(
            'bg-white hover:bg-white/70 dark:bg-neutral-950 dark:text-white dark:hover:bg-neutral-950/70',
            buttonProps?.className
          )}
        >
          <Plus className="text-primary" />
        </Button>
      </motion.div>
    </motion.div>
  )
}
