import { Interfaces } from "../services"; 

export type SortDirections = 'ASC' | 'DESC'

export const sortDragons = (dragons: Interfaces.IDragon[], sortDirection: SortDirections) => {
  const newDragons = dragons.sort((a, b) => {
    if (a.name?.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
      return sortDirection === 'ASC' ? 1 : -1;
    }
    if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
      return sortDirection === 'ASC' ? -1 : 1;
    }
    return 0;
  })
  
  return newDragons
}