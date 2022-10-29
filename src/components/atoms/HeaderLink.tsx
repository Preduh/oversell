interface Props {
  title: string
}

export const HeaderLink = ({ title }: Props): JSX.Element => {
  return (
    <a className="mr-5 hover:text-gray-900">{title}</a>
  )
}
