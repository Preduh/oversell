import { Bars3Icon } from '@heroicons/react/24/outline'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/Auth'
import { HeaderLinks } from '../molecules/HeaderLinks'
import { Logo } from '../molecules/Logo'
import { SignInButton } from '../molecules/SignInButton'
import { ToggleThemeButton } from '../molecules/ToggleThemeButton'

export const Header = (): JSX.Element => {
  const { user } = useContext(AuthContext)

  return (
    <header className="text-gray-600 sm:dark:bg-zinc-800 body-font">
      <div className="container mx-auto flex justify-between sm:flex-wrap py-4 px-8 sm:p-5 md:flex-row items-center">
        <Logo />
        <HeaderLinks />

        <div id="buttons" className="hidden sm:flex space-x-4">
          <ToggleThemeButton />
          {user.username
            ? (
            <div className="w-12 h-12 bg-purple-blue rounded-full flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-offset-2 hover:ring-offset-zinc-700 hover:ring-purple-blue hover:ring-opacity-50">
              <p className="uppercase text-gray-100 font-bold text-xl">
                {user.username.split('')[0]}
              </p>
            </div>
              )
            : (
            <SignInButton />
              )}
        </div>

        <Bars3Icon className='w-8 h-8 sm:hidden' />
      </div>
    </header>
  )
}
