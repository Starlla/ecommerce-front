import React, {useState} from 'react'

import { API } from '../config'
import Layout from '../core/Layout'

const Signup = () => {
  const [values, setValues] = useState({
    name:'',
    email:'',
    password:'',
    error:'',
    success: false
  })

  const handleChange = name => event => {
    setValues({...values, error: false, [name]: event.target.value})
  }
  
  const signUpForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted"> Name</label>
        <input onChange={handleChange('name')} type="name" className="form-control"></input>
      </div>
      <div className="form-group">
        <label className="text-muted"> Email</label>
        <input onChange={handleChange('email')} type="email" className="form-control"></input>
      </div>
      <div className="form-group">
        <label className="text-muted"> Password</label>
        <input onChange={handleChange('password')} type="password" className="form-control"></input>
      </div>
      <button className="btn btn-primary">Submit</button>
    </form>
  )

  return (
    <Layout title="Signup" description="Sigup to  E-Commerce App" className="container col-md-8 offset-md-2">
      {signUpForm()}
      {JSON.stringify(values)}
    </Layout>
  )
}




export default Signup;