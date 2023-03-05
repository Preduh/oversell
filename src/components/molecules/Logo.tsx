import Link from 'next/link'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/Auth'
import { LogoIcon } from '../atoms/LogoIcon'
import { LogoTitle } from '../atoms/LogoTitle'

export const Logo = (): JSX.Element => {
  const { token } = useContext(AuthContext)

  return (
    <Link href={token ? '/dashboard' : '/'} className="flex title-font font-medium items-center text-gray-900 md:mb-0">
      <LogoIcon className='w-10 h-10 sm:w-10 sm:h-10' />
      <LogoTitle />
    </Link>
  )
}
