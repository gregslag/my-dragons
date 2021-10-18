import React from 'react';

import { AuthContext, AuthContextProps } from '../context'

export function useAuth(): AuthContextProps {
  const context = React.useContext(AuthContext)

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider.')
  }

  return context
}