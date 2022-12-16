import type { AppProps } from 'next/app'
import { AuthProvider } from '../contexts/Auth'
import { ThemeProvider } from '../contexts/Theme'
import '../styles/globals.css'

export default function App ({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  )
}
