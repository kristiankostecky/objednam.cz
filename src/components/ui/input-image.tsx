'use client'

import type { InputProps } from '@/components/ui/input'
import { Input, InputWrapper } from '@/components/ui/input'
import { InputError } from '@/components/ui/input-error'
import { getInputErrorFromFormState } from '@/lib/errors'
import type { FormActionStateError } from '@/lib/forms'
import { cn } from '@/lib/utils'
import { ImageUp } from 'lucide-react'
import type { ReactNode } from 'react'
import { useState } from 'react'

const INPUT_KEY = 'dropzone-file'

interface InputImageProps extends InputProps {
  error?: FormActionStateError
  description?: ReactNode
}

export function InputImage({
  className,
  error,
  description,
  ...props
}: InputImageProps) {
  const [image, setImage] = useState<File | null>(null)
  const inputKey = props.name ?? INPUT_KEY

  return (
    <InputWrapper>
      <label
        htmlFor={props.id ?? INPUT_KEY}
        className={cn(
          'group relative flex h-64 w-full cursor-pointer flex-col items-center justify-center overflow-hidden rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-800',
          {
            'border-red-500': error
              ? Boolean(getInputErrorFromFormState(error, inputKey))
              : false,
          }
        )}
      >
        <div
          className={cn(
            { flex: !image, hidden: image },
            'z-10 flex-col items-center justify-center pb-6 pt-5 group-hover:flex'
          )}
        >
          <ImageUp size={32} />
          {description}
        </div>
        {image && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="absolute left-0 top-0 z-0 size-full object-contain group-hover:blur-md"
            src={URL.createObjectURL(image)}
            alt="image-preview"
            width="auto"
          />
        )}
        <Input
          className="absolute left-0 top-0 z-20 size-full cursor-pointer opacity-0"
          id={props.id ?? INPUT_KEY}
          type="file"
          accept="image/png, image/jpeg"
          onChange={(event) => {
            const file = event.target.files?.[0]
            if (file) {
              setImage(file)
            } else {
              setImage(null)
            }
            if (props.onChange) {
              props.onChange(event)
            }
          }}
          {...props}
        />
      </label>
      <InputError name={inputKey} error={error} />
    </InputWrapper>
  )
}
