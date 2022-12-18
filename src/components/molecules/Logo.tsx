import { LogoIcon } from '../atoms/LogoIcon'
import { LogoTitle } from '../atoms/LogoTitle'

export const Logo = (): JSX.Element => {
  return (
    <div className="flex title-font font-medium items-center text-gray-900 sm:mb-4 md:mb-0">
      <LogoIcon className='w-10 h-10 sm:w-12 sm:h-12' />
      <LogoTitle />
    </div>
  )
}
