import nookies from 'nookies'
import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../contexts/Auth'
import { HeaderLinks } from '../molecules/HeaderLinks'
import { Logo } from '../molecules/Logo'
import { SignInButton } from '../molecules/SignInButton'
import { ToggleThemeButton } from '../molecules/ToggleThemeButton'
import { UserPopover } from '../molecules/UserPopover'

interface HeaderProps {
  token: string
}

export const Header = ({ token }: HeaderProps): JSX.Element => {
  const [username, setUsername] = useState('')
  const { user } = useContext(AuthContext)

  useEffect(() => {
    const { 'oversell.username': oversellUsername } = nookies.get(null)

    if (user.username === '' && oversellUsername) {
      setUsername(oversellUsername)
    } else {
      setUsername(user.username)
    }
  }, [])

  return (
    <header className="fixed z-20 left-0 top-0 w-full text-gray-600 bg-white dark:bg-zinc-800 body-font h-16">
      <div className="px-8 md:px-24 flex justify-between sm:flex-wrap py-4 sm:py-0 md:flex-row items-center h-16">
        <Logo />
        {!token && <HeaderLinks />}

        <div id="buttons" className="flex space-x-4 items-center">
          <ToggleThemeButton />
          {username ? <UserPopover username={username} /> : <SignInButton />}
        </div>
      </div>
    </header>
  )
}
