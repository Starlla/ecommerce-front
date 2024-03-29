import { Link, Redirect } from 'react-router-dom'
import React, { useState } from 'react'
import {
  authenticate,
  isAuthenticated,
  signin
} from '../auth'

import Layout from '../core/Layout'

const Signin = () => {
  const [values, setValues] = useState({
    email: '',
    password: '',
    error: '',
    loading: false,
    redirectToReferrer: false,
  })

  const { email, password, error, loading, redirectToReferrer } = values
  const { user } = isAuthenticated()

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value })
  }

  const clickSubmit = (event) => {
    event.preventDefault()
    setValues({ ...values, error: false, loading: true })
    signin({ email, password }).then(
      data => {
        if (data.error) {
          setValues({ ...values, error: data.error, loading: false })
        } else {
          authenticate(data, () => {
            setValues({ ...values, redirectToReferrer: true })
          })
        }
      }
    )

  }

  const ShowError = () => (
    <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>{error}</div>
  )
  const ShowLoading = () => (
    loading && <div className="alert alert-info"><h2>Loading...</h2> <Link to="/signin">Signin</Link></div>
  )

  const redirectUser = () => {
    if (redirectToReferrer) {
      if (user && user.role === 1) {
        return <Redirect to="/admin/dashboard" />
      } else {
        return <Redirect to="/user/dashboard" />
      }
    }

    if (isAuthenticated()) {
      return <Redirect to="/" />;
    }
  }



  const signUpForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted"> Email</label>
        <input onChange={handleChange('email')} type="email" className="form-control" value={email}></input>
      </div>
      <div className="form-group">
        <label className="text-muted"> Password</label>
        <input onChange={handleChange('password')} type="password" className="form-control" value={password}></input>
      </div>
      <button onClick={clickSubmit} className="btn btn-primary">Submit</button>
    </form>
  )

  return (
    <Layout title="Signin" description="Sigin to  E-Commerce App" className="container col-md-8 offset-md-2">
      <div style={{ height: '30vh' }}>
        {ShowLoading()}
        {ShowError()}
        {signUpForm()}
        {redirectUser()}
      </div>
    </Layout>
  )
}

export default Signin;