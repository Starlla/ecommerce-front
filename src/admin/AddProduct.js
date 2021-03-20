import React, { useEffect, useState } from 'react'
import { createProduct, getCategories } from './apiAdmin'

import Layout from '../core/Layout'
import { Link } from "react-router-dom"
import { isAuthenticated } from '../auth'

const AddProduct = () => {
  const [values, setValues] = useState({
    name: '',
    description: '',
    price: '',
    categories: [],
    shipping: '',
    quantity: '',
    photo: '',
    loading: false,
    error: '',
    createdProduct: '',
    redirectToProfile: false,
    formData: '',
  })

  const { name,
    description,
    price,
    categories,
    shipping,
    quantity,
    photo,
    loading,
    error,
    createdProduct,
    redirectToProfile,
    formData
  } = values;

  //destructure user and token from localstorage
  const { user, token } = isAuthenticated()

  //load categories and set form data
  const init = () => {
    getCategories().then(data => {
      if (data.error) {
        setValues({ ...values, error: data.error })
      } else {
        setValues({ ...values, categories: data, formData: new FormData() })
      }
    })
  }


  useEffect(() => {
    init();
  }, []);


  const handleChange = name => event => {
    const value = name === 'photo' ? event.target.files[0] : event.target.value
    formData.set(name, value)
    setValues({ ...values, [name]: value })
  }

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: '', loading: true })

    createProduct(user._id, token, formData)
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error })
        } else {
          setValues({ ...values, name: '', description: '', photo: '', price: '', quantity: '', loading: false, createdProduct: data.name })
        }
      })
  }


  const newPostForm = () => (
    <form className='mb-3' onSubmit={clickSubmit}>
      <h4>Post Photo</h4>
      <div className='form-group'>
        <label className="btn btn-secondary">
          <input onChange={handleChange('photo')} type='file' name='photo' accept='image/*'></input>
        </label>
      </div>
      <div className="form-group">
        <label>Name</label>
        <input onChange={handleChange('name')} type="text" className="form-control" value={name}></input>
      </div>
      <div className="form-group">
        <label>Description</label>
        <textarea onChange={handleChange('description')} className="form-control" value={description}>description</textarea>
      </div>
      <div className="form-group">
        <label>Price</label>
        <input onChange={handleChange('price')} type="number" className="form-control" value={price}></input>
      </div>
      <div className="form-group">
        <label>Category</label>
        <select onChange={handleChange('category')} className="form-control">
          <option>Please select</option>
          {categories && categories.map((c, i) => (<option key={i} value={c._id}>{c.name}</option>))}
        </select>
      </div>
      <div className="form-group">
        <label className="text-muted">Shipping</label>
        <select onChange={handleChange('shipping')} type="number" className="form-control" >
          <option>Please select</option>
          <option value="0">No</option>
          <option value="1">Yes</option>
        </select>
      </div>
      <div className="form-group">
        <label>Quantity</label>
        <input onChange={handleChange('quantity')} type="number" className="form-control" value={quantity}></input>
      </div>
      <button className="btn btn-primary mt-3">Create Product</button>
    </form>
  )


  const showError = () => {
    if (error) {
      return <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>{error}</div>
    }
  }
  const showSuccess = () => {
    return (<div className="alert alert-info" style={{ display: createdProduct ? '' : 'none' }}>
      <h2>{createdProduct} is created!</h2>
    </div>)
  }
  const showLoading = () => loading && (<div className="alert alert-success"><h2>Loading...</h2></div>)


  const goBack = () => (
    <div className="mt-5">
      <Link to="/admin/dashboard" className="text-info">Back to Dashboard</Link>
    </div>
  )

  return (
    <Layout className="p-5" title="Add a new product" description={`Hello ${user.name}, ready to add a new category?`}>
      <div className="row">
        <div className="col-md-8 offset-md-2">
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newPostForm()}
          {goBack()}
        </div>
      </div>

    </Layout>
  )

}

export default AddProduct;