import { useContext } from 'react'
import { ThemeContext } from '../../contexts/Theme'

export const ToggleButton = (): JSX.Element => {
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
        Light
      </span>

    <label
      htmlFor="default-toggle"
      className="inline-flex relative items-center cursor-pointer"
    >
      <input
        type="checkbox"
        checked={theme === 'dark'}
        onChange={toggle}
        id="default-toggle"
        className="sr-only peer"
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>

    </label>

    <span className="text-sm font-medium text-gray-900 dark:text-gray-300">
        Dark
      </span>
    </div>
  )
}
