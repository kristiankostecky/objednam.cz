import type { z } from 'zod'
import { ZodError } from 'zod'

function formatZodValidationError<TKey extends string | number | symbol>(
  error: ZodError
) {
  return Object.fromEntries<string>(
    error.issues.flatMap((issue) => {
      const key = issue.path[0]
      if (key) {
        return [[key, issue.message]]
      }
      return []
    })
  ) as Partial<Record<TKey, string>>
}

export function validateFormData<TSchema extends z.ZodTypeAny>(
  formData: FormData,
  schema: TSchema
) {
  try {
    const data = schema.parse(
      Object.fromEntries(formData.entries())
    ) as z.infer<TSchema>
    return { data }
  } catch (error) {
    if (error instanceof ZodError) {
      return { error: formatZodValidationError<keyof z.infer<TSchema>>(error) }
    }
    throw error
  }
}
