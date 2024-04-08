import { routes } from '@/config/routes'
import { SoupIcon } from 'lucide-react'
import Link from 'next/link'

export function Logo() {
  return (
    <Link
      href={routes.home}
      className="flex items-center gap-2 text-lg font-semibold"
    >
      <SoupIcon className="size-6" />
      <span className="sr-only">Objedname!</span>
    </Link>
  )
}
