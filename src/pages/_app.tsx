import type { AppProps } from 'next/app'
import nookies from 'nookies'
import { useEffect } from 'react'
import { api } from '../config/api'
import { AuthProvider } from '../contexts/Auth'
import { ThemeProvider } from '../contexts/Theme'
import '../styles/globals.css'

export default function App ({ Component, pageProps }: AppProps): JSX.Element {
  const { 'oversell.token': token } = nookies.get(null)

  useEffect(() => {
    if (token) {
      api.defaults.headers.Authorization = `Bearer ${token}`
    }
  }, [token])

  return (
    <ThemeProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </ThemeProvider>
  )
}
