'use client'

import type { ButtonProps } from '@/components/ui/button'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { forwardRef } from 'react'
import { useFormStatus } from 'react-dom'

export const FormButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, ref) => {
    const { pending } = useFormStatus()

    return (
      <Button disabled={pending} ref={ref} {...props}>
        {pending && <Spinner className="mr-2 size-4 " />}
        {children}
      </Button>
    )
  }
)

FormButton.displayName = 'SubmitButton'
