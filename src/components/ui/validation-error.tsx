import { cn } from '@/lib/utils'
import type { HTMLAttributes } from 'react'

export function ValidationError({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  if (!children) {
    return null
  }

  return (
    <p className={cn('text-sm text-destructive', className)} {...props}>
      {children}
    </p>
  )
}
