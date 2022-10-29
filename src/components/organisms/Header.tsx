import * as React from 'react'
import { HeaderLinks } from '../molecules/HeaderLinks'
import { Logo } from '../molecules/Logo'
import { SignInButton } from '../molecules/SignInButton'
import { ToggleThemeButton } from '../molecules/ToggleThemeButton'

export const Header = (): JSX.Element => {
  return (
    <header className="text-gray-600 dark:bg-gray-900 body-font">
        <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
          <Logo />
          <HeaderLinks />

          <div id="buttons" className="flex space-x-4">
            <ToggleThemeButton />
            <SignInButton />
          </div>
        </div>
      </header>
  )
}
