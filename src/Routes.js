import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Dashboard from './user/UserDashboard'
import Home from './core/Home'
import PrivateRoute from './auth/PrivateRoute'
import React from 'react'
import Signin from './user/Signin';
import Signup from './user/Signup';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <PrivateRoute path="/user/dashboard" exact component={Dashboard}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;