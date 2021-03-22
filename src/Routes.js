import { BrowserRouter, Route, Switch } from 'react-router-dom'

import AddCategory from './admin/AddCategory'
import AddProduct from './admin/AddProduct'
import AdminDashboard from './user/AdminDashboard'
import AdminRoute from './auth/AdminRoute'
import Dashboard from './user/UserDashboard'
import Home from './core/Home'
import PrivateRoute from './auth/PrivateRoute'
import Product from "./core/Product";
import React from 'react'
import Shop from './core/Shop'
import Signin from './user/Signin';
import Signup from './user/Signup';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/shop" exact component={Shop} />
        <Route path="/signin" exact component={Signin} />
        <Route path="/signup" exact component={Signup} />
        <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
        <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
        <AdminRoute path="/create/category" exact component={AddCategory} />
        <AdminRoute path="/create/product" exact component={AddProduct} />
        <Route path="/product/:productId" exact component={Product} />
      </Switch>
    </BrowserRouter>
  )
}

export default Routes;