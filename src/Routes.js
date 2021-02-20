import { BrowserRouter, Route, Switch } from 'react-router-dom'

import AddCategory from './admin/AddCategory'
import AdminDashboard from './user/AdminDashboard'
import AdminRoute from './auth/AdminRoute'
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
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard}/>
        <AdminRoute path="/create/category" exact component={AddCategory}/>
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;