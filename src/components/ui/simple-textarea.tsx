import { InputWrapper } from '@/components/ui/input'
import { InputError } from '@/components/ui/input-error'
import { Textarea, type TextareaProps } from '@/components/ui/textarea'
import type { FormActionStateError } from '@/lib/forms'
import { cn } from '@/lib/utils'

interface SimpleTextareaProps extends Omit<TextareaProps, 'name'> {
  name: string
  label: string
  error?: FormActionStateError | undefined
}

export function SimpleTextarea({
  label,
  name,
  error,
  disabled,
  ...textareaProps
}: SimpleTextareaProps) {
  return (
    <InputWrapper>
      <label className={cn({ 'opacity-40': disabled })} htmlFor={name}>
        {label}
      </label>
      <Textarea name={name} id={name} disabled={disabled} {...textareaProps} />
      <InputError error={error} name={name} />
    </InputWrapper>
  )
}
