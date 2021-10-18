import React from 'react'
import { BrowserRouter, Switch, Redirect } from 'react-router-dom'
import Route from './Route'

import Home from '../views/Home'
import SignIn from '../views/SignIn'
import SignUp from '../views/SignUp'
import Dragons from '../views/Dragons'

export const routes = {
  signIn: '/entrar',
  signUp: '/cadastro',
  home: '/',
  dragons: '/dragoes',
}

const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path={routes.home} exact component={Home} />
        <Route path={routes.signIn} exact component={SignIn} />
        <Route path={routes.signUp} exact component={SignUp} />
        <Route path={routes.dragons} isPrivate exact component={Dragons} />
        <Redirect from="*" to="/" />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes