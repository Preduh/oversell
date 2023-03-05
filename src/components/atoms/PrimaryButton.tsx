import { ButtonHTMLAttributes, DetailedHTMLProps } from 'react'

interface PrimaryButtonProps
  extends DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
  > {
  children: any
}

export const PrimaryButton = ({
  className,
  children,
  ...props
}: PrimaryButtonProps): JSX.Element => {
  return (
    <button
      className={`flex items-center justify-center space-x-2 w-full bg-purple-blue h-10 rounded-md text-white font-medium transition-all cursor-pointer outline-none hover:ring-2 hover:ring-offset-2 hover:ring-offset-white dark:hover:ring-offset-zinc-700 hover:ring-purple-blue dark:hover:ring-opacity-50 ${className ?? ''}`}
      {...props}
    >
      {children}
    </button>
  )
}
