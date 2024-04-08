import type { InputProps } from '@/components/ui/input'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ValidationError } from '@/components/ui/validation-error'
import { cn } from '@/lib/utils'
import { forwardRef } from 'react'

interface FormFieldProps extends InputProps {
  label: string
  inputKey: string
  error?: string
}

export const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  ({ inputKey, error, label, className, ...props }, ref) => {
    return (
      <div ref={ref} className={cn('flex flex-col gap-2', className)}>
        <Label htmlFor={inputKey}>{label}</Label>
        <Input id={inputKey} name={inputKey} {...props} />
        <ValidationError>{error}</ValidationError>
      </div>
    )
  }
)

FormField.displayName = 'FormField'
