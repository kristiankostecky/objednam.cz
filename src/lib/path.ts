import type { Replace } from '@/lib/types'

const removeTrailingSlash = (val: string) =>
  val.endsWith('/') ? val.substring(0, val.length - 1) : val

// https://gist.github.com/tomfa/f925366cd036bb0d4af5bbd8397c84ae
export const matchPath = (pathname: string, pattern: string | null) => {
  if (!pattern) {
    return false
  }
  if (pathname === pattern) {
    return true
  }
  const basePath = removeTrailingSlash(pathname.split('?')[0] as string)
  const basePattern = removeTrailingSlash(pattern.split('?')[0] as string)
  if (basePath === basePattern) {
    return true
  }
  const basePathPatternRegex = new RegExp(
    `^${basePattern.replace(/(\[[a-zA-Z0-9-]+\])+/g, '[a-zA-Z0-9-]+')}$`
      .replace(/\[\[\.\.\.[a-zA-Z0-9-]+\]\]/g, '?.*')
      .replace(/\[\.\.\.[a-zA-Z0-9-]+\]/g, '.*')
  )
  if (basePathPatternRegex.test(basePath)) {
    return true
  }
  return false
}

type ExtractRouteParams<T extends string> = string extends T
  ? Record<string, string>
  : T extends `${string}:${infer Param}/${infer Rest}`
    ? { [k in Param | keyof ExtractRouteParams<Rest>]: string }
    : T extends `${string}:${infer Param}`
      ? { [k in Param]: string }
      : object

type ResultPath<T extends string> = Replace<T, `:`, ''>

export function generatePath<S extends string>(
  path: S,
  params: ExtractRouteParams<S>
) {
  return path.replace(/:\w+/g, (match) => {
    const paramName = match.slice(1)
    return params[paramName as keyof typeof params] as string
  }) as ResultPath<S>
}
