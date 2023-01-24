
interface LogoIconProps {
  className: string
}

export const LogoIcon = ({ className }: LogoIconProps): JSX.Element => {
  return (
    <div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        className={`${className} text-white p-2 bg-indigo-500 rounded-full`}
        viewBox="0 0 24 24"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
      </svg>
    </div>
  )
}
