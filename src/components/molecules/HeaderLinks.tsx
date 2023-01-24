import { HeaderLink } from '../atoms/HeaderLink'
import { v4 as uuid } from 'uuid'

interface Link {
  id: string
  title: string
  path: string
}

const links: Link[] = [
  {
    id: uuid(),
    title: 'Dashboard',
    path: '/dashboard'
  },
  {
    id: uuid(),
    title: 'Second Link',
    path: '#'
  },
  {
    id: uuid(),
    title: 'Third Link',
    path: '#'
  },
  {
    id: uuid(),
    title: 'Fourth Link',
    path: '#'
  }
]

export const HeaderLinks = (): JSX.Element => {
  return (
    <nav className="hidden md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 sm:flex flex-wrap items-center text-base justify-center">
      {links.map((link) => (
        <HeaderLink key={link.id} title={link.title} path={link.path} />
      ))}
    </nav>
  )
}
