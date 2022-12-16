import { createContext, Dispatch, SetStateAction, useMemo, useState } from 'react'

interface User {
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

const AuthContext = createContext<ContextProps>({} as ContextProps)

const AuthProvider = ({ children }: AuthProviderProps): JSX.Element => {
  const [user, setUser] = useState<User>({
    id: '',
    email: '',
    username: ''
  })

  const [token, setToken] = useState<string>('')

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
