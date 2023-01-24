import Link from 'next/link'

interface Props {
  title: string
  path: string
}

export const HeaderLink = ({ title, path }: Props): JSX.Element => {
  return (
    <Link
      href={path}
      className="mr-5 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-50 hover:-translate-y-[0.125rem] transition-transform cursor-pointer"
    >
      {title}
    </Link>
  )
}
