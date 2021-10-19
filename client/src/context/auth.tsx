import React from 'react'
import { APIAuth, Interfaces } from '../services'
import { toast } from 'react-toastify'
import { routes } from '../routes'

export interface AuthContextProps {
  loading: boolean
  signed: boolean
  user: object | null
  signUp(_: Interfaces.IUser): void
  signIn(_: Interfaces.IAuthPayload): void
  signOut(): void
}

export const AuthContext = React.createContext<AuthContextProps>({} as AuthContextProps)

export const AuthProvider: React.FC<any> = ({ history, children }) => {
  const [loading, setLoading] = React.useState(false)
  const [token, setToken] = React.useState<string | null>(localStorage.getItem('@MyDragons:token'))
  const [user, setUser] = React.useState<Interfaces.IUser | null>(null)

  const signOut = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('@MyDragons:token')
    localStorage.removeItem('@MyDragons:user')
  }

  const signUp = async (usr: Interfaces.IUser) => {
    setLoading(true)
    try {
      const data = await APIAuth.register(usr)
      setUser(data)
      setToken(data.accessToken!)

      localStorage.setItem('@MyDragons:token', data.accessToken!)
      localStorage.setItem('@MyDragons:user', JSON.stringify(data))

      setLoading(false)
      history.push(routes.dragons)
    } catch (error: any) {
      toast.error('Este email já está sendo utilizado!')
      setLoading(false)
      console.error(error)
    }
  }

  const signIn = async ({ email, password }: Interfaces.IAuthPayload) => {
    setLoading(true)
    try {
      const data = await APIAuth.login({ email, password })
      setUser(data)
      setToken(data.accessToken!)

      localStorage.setItem('@MyDragons:token', data.accessToken!)
      localStorage.setItem('@MyDragons:user', JSON.stringify(data))

      setLoading(false)
      history.push(routes.dragons)
    } catch (error: any) {
      toast.error('Usuário e/ou senha inválidos!')
      setLoading(false)
      console.error(error)
    }
  }

  const checkToken = () => {
    const token = localStorage.getItem('@MyDragons:token')
    if (!token) {
      signOut()
    }
  }

  React.useEffect(() => {
    window.addEventListener('storage', checkToken)
    
    return () => {
      window.removeEventListener('storage', checkToken)
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        loading,
        signed: !!token,
        user,
        signUp,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
