import { Logo } from '@/components/logo'
import { Button } from '@/components/ui/button'
import { NavLink } from '@/components/ui/nav-link'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'
import Link from 'next/link'

type LinkEntity = {
  href: string
  label: string
}

export function Navbar({ links }: { links: Array<LinkEntity> }) {
  return (
    <header className="sticky top-0 z-40 flex h-16 min-h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="container">
        <nav className="hidden max-w-7xl flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Logo />
          {links.map((link) => {
            return (
              <NavLink key={link.href} href={link.href}>
                {link.label}
              </NavLink>
            )
          })}
        </nav>
      </div>
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" size="icon" className="shrink-0 md:hidden">
            <Menu className="size-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Logo />
            {links.map((link) => {
              return (
                <Link key={link.href} href={link.href}>
                  {link.label}
                </Link>
              )
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </header>
  )
}
