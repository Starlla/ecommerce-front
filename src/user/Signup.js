import React, { useState } from 'react'

import Layout from '../core/Layout'
import {Link} from 'react-router-dom'
import {signup} from '../auth'

const Signup = () => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    error: '',
    success: false
  })

  const { name, email, password, error, success } = values

  const handleChange = name => event => {
    setValues({ ...values, error: false, [name]: event.target.value })
  }

  const clickSubmit = (event) => {
    event.preventDefault()
    setValues({...values, error: false})
    signup({ name, email, password }).then(
      data => {
        console.log(data);
        if (data.error) {
          setValues({ ...values, error: data.error, success:false })
        } else {
          setValues({ ...values, namme: '', email: '', password: '', error: '', success: true })
        }
      }
    )

  }

  const ShowError = () => (
    <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>{error}</div>
  )
  const ShowSuccess = () => (
    <div className="alert alert-info" style={{ display: success ? '' : 'none' }}>New account is created. Please <Link to="/signin">Signin</Link></div>
  )



  const signUpForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted"> Name</label>
        <input onChange={handleChange('name')} type="name" className="form-control" value={name}></input>
      </div>
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
    <Layout title="Signup" description="Sigup to  E-Commerce App" className="container col-md-8 offset-md-2">
      {ShowSuccess()}
      {ShowError()}
      {signUpForm()}
      {JSON.stringify(values)}
    </Layout>
  )
}




export default Signup;