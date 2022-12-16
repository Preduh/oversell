import { LogoIcon } from '../atoms/LogoIcon'
import { LogoTitle } from '../atoms/LogoTitle'

export const Logo = (): JSX.Element => {
  return (
    <div className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
      <LogoIcon className='w-12 h-12' />
      <LogoTitle />
    </div>
  )
}
