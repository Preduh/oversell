import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/solid'
import { DetailedHTMLProps, InputHTMLAttributes, useState } from 'react'
import { FieldError, RefCallBack } from 'react-hook-form/dist/types'

interface TextInputProps
  extends DetailedHTMLProps<
  InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
  > {
  label: string
  name: string
  placeholder?: string
  value: string
  autoFocus?: boolean
  onChange: (...event: any[]) => void
  error?: FieldError
  required?: boolean
  type?: string
  fowardRef?: RefCallBack
  optional?: boolean
}

export const TextInput = ({
  onChange,
  value = '',
  error,
  label,
  name,
  autoFocus,
  placeholder,
  fowardRef,
  required,
  disabled,
  optional,
  type
}: TextInputProps): JSX.Element => {
  const [passwordIsHidden, setPasswordIsHidden] = useState(true)

  const togglePassword = (): void => {
    setPasswordIsHidden(!passwordIsHidden)
  }

  return (
    <div className="flex flex-col w-full text-sm cursor-text relative space-y-2">
      <label htmlFor={name} className="text-zinc-600 text-sm dark:text-secondary-dark-text">
        {label}
        {required && <span className="text-red-500">*</span>}
        {optional && <span className="text-gray-500 ml-1">(opcional)</span>}
      </label>
      <div className="flex w-full relative">
        <input
          ref={fowardRef}
          type={!passwordIsHidden ? 'text' : type ?? 'text'}
          id={name}
          value={value}
          autoFocus={autoFocus}
          disabled={disabled}
          onChange={onChange}
          placeholder={placeholder}
          aria-label={label}
          className={`border w-full ${
            error ? 'border-red-400 outline-red-400' : 'border-zinc-300 dark:border-zinc-500'
          }  bg-zinc-100 h-10 px-2 text-slate-600 dark:text-gray-100 focus:outline-none dark:focus:border dark:focus:border-indigo-500 dark:bg-zinc-600`}
        />
        {type === 'password' &&
          (passwordIsHidden
            ? (
            <EyeIcon
              onClick={togglePassword}
              className="w-5 h-5 text-zinc-500 hover:cursor-pointer absolute right-2 top-1/2 -translate-y-1/2"
            />
              )
            : (
            <EyeSlashIcon
              onClick={togglePassword}
              className="w-5 h-5 text-zinc-500 hover:cursor-pointer absolute right-2 top-1/2 -translate-y-1/2"
            />
              ))}
      </div>
      <p className="text-red-500 mt-1">{error?.message}</p>
    </div>
  )
}
