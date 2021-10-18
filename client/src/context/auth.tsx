import React, { useState, createContext } from 'react'
import { APIAuth, Interfaces } from '../services'
import { toast } from 'react-toastify'
import { routes } from '../routes'

export interface AuthContextProps {
  signed: boolean
  user: object | null
  signUp(_: Interfaces.IUser): void
  signIn(_: Interfaces.IAuthPayload): void
  signOut(): void
}

export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const AuthProvider: React.FC<any> = ({ children, history }) => {
  const [user, setUser] = useState<Interfaces.IUser | null>(null)

  const signOut = () => {
    setUser(null)
    localStorage.removeItem('@MyDragons:token')
    localStorage.removeItem('@MyDragons:user')
  }

  const signUp = async (usr: Interfaces.IUser) => {
    try {
      const data = await APIAuth.register(usr)
      setUser(data)

      localStorage.setItem('@MyDragons:token', data.accessToken!)
      localStorage.setItem('@MyDragons:user', JSON.stringify(data))

      history.push(routes.dragons)
    } catch (error: any) {
      toast.error('Usuário e/ou senha inválidos!')
      console.error(error)
    }
  }

  const signIn = async ({ email, password }: Interfaces.IAuthPayload) => {
    try {
      const data = await APIAuth.login({ email, password })
      setUser(data)

      localStorage.setItem('@MyDragons:token', data.accessToken!)
      localStorage.setItem('@MyDragons:user', JSON.stringify(data))

      history.push(routes.dragons)
    } catch (error: any) {
      toast.error('Usuário e/ou senha inválidos!')
      console.error(error)
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!localStorage.getItem('@MyDragons:token'),
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
