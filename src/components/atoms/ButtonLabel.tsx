interface Props {
  label: string
}

export const ButtonLabel = ({ label }: Props): JSX.Element => {
  return (
    <label htmlFor="signin-button" className="cursor-pointer">
      {label}
    </label>
  )
}
