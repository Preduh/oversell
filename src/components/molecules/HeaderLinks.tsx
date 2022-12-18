import { HeaderLink } from '../atoms/HeaderLink'
import { v4 as uuid } from 'uuid'

interface Link {
  id: string
  title: string
}

const links: Link[] = [
  {
    id: uuid(),
    title: 'First Link'
  },
  {
    id: uuid(),
    title: 'Second Link'
  },
  {
    id: uuid(),
    title: 'Third Link'
  },
  {
    id: uuid(),
    title: 'Fourth Link'
  }
]

export const HeaderLinks = (): JSX.Element => {
  return (
    <nav className="hidden md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 sm:flex flex-wrap items-center text-base justify-center">
      {links.map((link) => (
        <HeaderLink key={link.id} title={link.title} />
      ))}
    </nav>
  )
}
