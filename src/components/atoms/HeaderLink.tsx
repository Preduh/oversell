interface Props {
  title: string
}

export const HeaderLink = ({ title }: Props): JSX.Element => {
  return (
    <a className="mr-5 hover:text-gray-900 dark:text-gray-300 dark:hover:text-gray-50 hover:-translate-y-[0.125rem] transition-transform cursor-pointer">{title}</a>
  )
}
