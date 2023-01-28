import Link from 'next/link'
import { LogoIcon } from '../atoms/LogoIcon'
import { LogoTitle } from '../atoms/LogoTitle'

export const Logo = (): JSX.Element => {
  return (
    <Link href="/" className="flex title-font font-medium items-center text-gray-900 sm:mb-4 md:mb-0">
      <LogoIcon className='w-10 h-10 sm:w-10 sm:h-10' />
      <LogoTitle />
    </Link>
  )
}
