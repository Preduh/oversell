import type { AppProps } from 'next/app'
import { ThemeProvider } from '../contexts/Theme'
import '../styles/globals.css'

export default function App ({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider>
      <Component {...pageProps} />
    </ThemeProvider>
  )
}
