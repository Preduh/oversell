import { useRouter } from 'next/router'
import {
  createContext,
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState
} from 'react'
import { api } from '../components/config/api'
import nookies from 'nookies'

export interface User {
  id: string
  email: string
  username: string
}

interface ContextProps {
  user: User
  setUser: Dispatch<SetStateAction<User>>
  token: string
  setToken: Dispatch<SetStateAction<string>>
}

interface AuthProviderProps {
  children: JSX.Element
}

export interface RecoverUserResponse {
  id: string
  email: string
  username: string
}

const AuthContext = createContext<ContextProps>({} as ContextProps)

const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [user, setUser] = useState<User>({
    id: '',
    email: '',
    username: ''
  })

  const [token, setToken] = useState<string>('')

  const router = useRouter()

  // Checa se o token é válido
  useEffect(() => {
    if (localStorage) {
      const { 'oversell.token': recoveredToken } = nookies.get(null)

      if (recoveredToken) {
        setToken(recoveredToken)

        api
          .get<RecoverUserResponse>('/isAuth', {
          headers: {
            authorization: `Bearer ${recoveredToken}`
          }
        })
          .then((response) => {
            setUser(response.data)
          })
          .catch((error) => {
            return error
          })
      } else {
        router.push('/entrar').catch(() => {})
      }
    }
  }, [])

  const authContextValue = useMemo(
    () => ({
      user,
      setUser,
      token,
      setToken
    }),
    [user, token, setUser, setToken]
  )

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }
