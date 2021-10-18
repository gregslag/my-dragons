import React from 'react'
import { Route, Redirect, RouteProps } from 'react-router-dom'
import { useAuth } from '../hooks'
import { routes } from './'
 
interface RouteWrapperProps extends RouteProps {
  isPrivate?: boolean
}

const RouteWrapper: React.FC<RouteWrapperProps> = ({
  component: Component,
  path,
  exact = false,
  isPrivate = false,
  ...rest
}) => {
  const { signed } = useAuth()

  if (!signed && isPrivate) {
    return <Redirect to={routes.signIn} />
  }

  if (signed && !isPrivate) {
    return <Redirect to={routes.dragons} />
  }

  return <Route {...rest} path={path} exact={exact} component={Component} />
}

export default RouteWrapper