import React from 'react'
import { Switch, Redirect } from 'react-router-dom'
import Route from './Route'

import Home from '../views/Home'
import SignIn from '../views/SignIn'
import SignUp from '../views/SignUp'
import Dragons from '../views/Dragons'
import CreateDragon from '../views/CreateDragon'
import UpdateDragon from '../views/UpdateDragon'
import DragonDetail from '../views/DragonDetail'

export const routes = {
  signIn: '/entrar',
  signUp: '/cadastro',
  home: '/',
  dragons: '/dragoes',
  createDragon: '/cadastrar-dragao',
  updateDragon: '/editar-dragao/:id',
  dragonDetail: '/dragao/:id',
}

const Routes: React.FC = () => {
  return (
      <Switch>
        <Route path={routes.home} exact component={Home} />
        <Route path={routes.signIn} exact component={SignIn} />
        <Route path={routes.signUp} exact component={SignUp} />
        <Route path={routes.dragons} isPrivate exact component={Dragons} />
        <Route path={routes.createDragon} isPrivate exact component={CreateDragon} />
        <Route path={routes.updateDragon} isPrivate exact component={UpdateDragon} />
        <Route path={routes.dragonDetail} isPrivate exact component={DragonDetail} />
        <Redirect from="*" to="/" />
      </Switch>
  )
}

export default Routes