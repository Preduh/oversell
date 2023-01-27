import { useContext } from 'react'
import { ThemeContext } from '../../contexts/Theme'
import { MoonIcon } from '../atoms/MoonIcon'
import { SunIcon } from '../atoms/SunIcon'

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
      <span onClick={() => toggle()} className="text-sm cursor-pointer w-10 h-10 flex items-center justify-center rounded-md transition-all font-medium text-gray-900 dark:text-gray-300">
        {theme === 'dark' ? (<SunIcon />) : (<MoonIcon />)}
      </span>
    </div>
  )
}
