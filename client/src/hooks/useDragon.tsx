import React from 'react';

import { DragonContext, DragonContextProps } from '../context'

export function useDragon(): DragonContextProps {
  const context = React.useContext(DragonContext)

  if (!context) {
    throw new Error('useDragon must be used within an DragonProvider.')
  }

  return context
}