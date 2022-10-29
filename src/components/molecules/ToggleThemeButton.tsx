import { useContext } from 'react'
import { ThemeContext } from '../../contexts/Theme'
import { MoonIcon } from '../atoms/MoonIcon'
import { SunIcon } from '../atoms/SunIcon'
import { SwitchButton } from '../atoms/SwitchButton'

export const ToggleThemeButton = (): JSX.Element => {
  const { theme, setTheme } = useContext(ThemeContext)

  const toggle = (): void => {
    if (theme === 'dark') {
      setTheme('light')
      localStorage.setItem('theme', 'light')
    } else {
      setTheme('dark')
      localStorage.setItem('theme', 'dark')
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
        <SunIcon />
      </span>

      <SwitchButton onChange={toggle} value={theme === 'dark'} />

      <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
        <MoonIcon />
      </span>
    </div>
  )
}
