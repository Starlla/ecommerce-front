import React, { useState } from 'react'

import Layout from '../core/Layout'
import { Link } from "react-router-dom"
import { createCategory } from './apiAdmin'
import { isAuthenticated } from '../auth'

const AddCategory = () => {
  const [name, setName] = useState('')
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  //destructure user and token from localstorage
  const { user, token } = isAuthenticated()

  const handleChange = (e) => {
    setError('')
    setName(e.target.value)
  }

  const clickSubmit = (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)
    //make request to api to create category
    createCategory(user._id, token, { name })
      .then(data => {
        if (data.error) {
          setError(true);
        } else {
          setError("");
          setSuccess(true)
        }
      })
  }

  const showSuccess = () => {
    if (success) {
      return <h3 className="text-success">{name} is created</h3>
    }
  }
  const showError = () => {
    if (error) {
      return <h3 className="text-danger">Category should be unique</h3>
    }
  }
  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="text-info">Back to Dashboard</Link>
    </div>
  )

  const newCategoryForm = () => (
    <form onSubmit={clickSubmit}>
      <div className="form-group">
        <label className="text-muted mb-2">Name</label>
        <input type="text" className="form-control" onChange={handleChange} value={name} autoFocus required></input>
      </div>
      <button className="btn btn-primary mt-3"> Create Category</button>
    </form>
  )

  return (
    <Layout className="p-5" title="Add a new category" description={`Hello ${user.name}, ready to add a new category?`}>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showSuccess()}
          {showError()}
          {newCategoryForm()}
          {goBack()}
        </div>
      </div>

    </Layout>
  )

}

export default AddCategory;