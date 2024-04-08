import type { ButtonProps } from '@/components/ui/button'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { cn } from '@/lib/utils'
import { Slot } from '@radix-ui/react-slot'
import React from 'react'
import { useFormStatus } from 'react-dom'

export const SubmitButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, asChild = false, children, ...props }, ref) => {
    const { pending } = useFormStatus()

    const Comp = asChild ? Slot : Button
    return (
      <Comp
        className={cn('gap-2', className)}
        disabled={pending || props.disabled}
        ref={ref}
        {...props}
      >
        {children}
        {pending && <Spinner className="size-4" />}
      </Comp>
    )
  }
)

SubmitButton.displayName = 'SubmitButton'
