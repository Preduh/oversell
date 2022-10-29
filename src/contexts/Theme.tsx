import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState
} from 'react'

type Theme = 'dark' | 'light'

interface ThemeProviderProps {
  children: JSX.Element
}

interface ContextProps {
  theme: Theme
  setTheme: Dispatch<SetStateAction<Theme>>
}

const ThemeContext = createContext<ContextProps>({} as ContextProps)

const ThemeProvider = ({ children }: ThemeProviderProps): JSX.Element => {
  const [theme, setTheme] = useState<Theme>('light')

  useEffect(() => {
    const storagedTheme = localStorage.getItem('theme') as Theme

    if (!storagedTheme) {
      localStorage.setItem('theme', 'light')
    } else {
      setTheme(storagedTheme)
      localStorage.setItem('theme', storagedTheme)
    }
  }, [])

  const themeContextValue = useMemo(
    () => ({
      theme,
      setTheme
    }),
    [theme, setTheme]
  )

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <div className={theme === 'dark' ? 'dark' : ''}>{children}</div>
    </ThemeContext.Provider>
  )
}

export { ThemeContext, ThemeProvider }
