import React from 'react'
import { APIDragon, Interfaces } from '../services'
import { toast } from 'react-toastify'
import { sortDragons, SortDirections } from '../utils'
import { routes } from '../routes'

export type FormType = 'CREATE' | 'UPDATE'

export interface DragonContextProps {
  queryLoading: boolean
  mutationLoading: boolean
  dragons: Interfaces.IDragon[]
  dragonDetails?: Interfaces.IDragon,
  sortDirection:  SortDirections
  handleSort: (_: SortDirections) => void
  getAllDragons: () => void
  getDragonDetails: (_: string) => void
  mutateDragon: (d: Interfaces.IDragon, t: FormType) => void
  deleteDragon: (_: string) => void
}

export const DragonContext = React.createContext<DragonContextProps>({} as DragonContextProps)

export const DragonProvider: React.FC<any> = ({ history, children }) => {
  const [sort, setSort] = React.useState<SortDirections>('ASC')
  const [queryLoading, setQueryLoading] = React.useState(false)
  const [mutationLoading, setMutationLoading] = React.useState(false)
  const [dragons, setDragons] = React.useState<Interfaces.IDragon[]>([])
  const [dragonDetails, setDragonDetails] = React.useState<Interfaces.IDragon>()

  const handleSort = (sortDirection: SortDirections) => {
    setSort(sortDirection)
    setDragons(sortDragons(dragons, sortDirection))
  }

  const getAllDragons = async () => {
    setQueryLoading(true)
    try {
      const data = await APIDragon.getDragons()
      setDragons(sortDragons(data, sort))

      setQueryLoading(false)
    } catch (error: any) {
      toast.error('Ops! Ocorreu um erro')
      setQueryLoading(false)
      console.error(error)
    }
  }

  const getDragonDetails = async (id: string) => {
    setQueryLoading(true)
    try {
      const data = await APIDragon.getDragonById(id)
      setDragonDetails(data)

      setQueryLoading(false)
    } catch (error: any) {
      toast.error('Ops! Ocorreu um erro')
      setQueryLoading(false)
      console.error(error)
    }
  }

  const mutateDragon = async (dragon: Interfaces.IDragon, type: FormType) => {
    setMutationLoading(true)
    try {
      const method = type === 'CREATE' ? 'createDragon' : 'updateDragon'
      await APIDragon[method](dragon)
      setDragonDetails(undefined)

      setMutationLoading(false)
      toast.success(`Dragão ${type === 'CREATE' ? 'criado' : 'atualizado'} com sucesso!`)
      history.push(routes.dragons)
    } catch (error: any) {
      toast.error('Ops! Ocorreu um erro')
      setMutationLoading(false)
      console.error(error)
    }
  }

  const deleteDragon = async (id: string) => {
    setMutationLoading(true)
    try {
      await APIDragon.deleteDragon(id)
      setDragons(sortDragons(dragons.filter(d => d.id !== id), sort))

      setMutationLoading(false)
      toast.success(`Dragão deletado com sucesso!`)
      history.push(routes.dragons)
    } catch (error: any) {
      toast.error('Ops! Ocorreu um erro')
      setMutationLoading(false)
      console.error(error)
    }
  }

  return (
    <DragonContext.Provider
      value={{
        queryLoading,
        mutationLoading,
        dragons,
        dragonDetails,
        handleSort,
        getAllDragons,
        getDragonDetails,
        mutateDragon,
        deleteDragon,
        sortDirection: sort
      }}
    >
      {children}
    </DragonContext.Provider>
  )
}
