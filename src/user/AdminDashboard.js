import Layout from '../core/Layout'
import { Link } from "react-router-dom"
import React from 'react'
import { isAuthenticated } from '../auth'

const AdminDashboard = () => {
  const { user: { _id, name, email, role } } = isAuthenticated()

  const adminLinks = () => {
    return (
      <div className="card mb-5  ">
        <h4 className="card-header">Admin Links</h4>
        <ul className='list-group'>
          <li className="list-group-item">
            <Link className="nav-link" to="/create/category">Create Category</Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link" to="/create/product">Create Product</Link>
          </li>
        </ul>
      </div>
    )
  }

  const adminInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">AdminInformation</h3>
        <ul className='list-group'>
          <li className="list-group-item">{name}</li>
          <li className="list-group-item">{email}</li>
          <li className="list-group-item">{role === 1 ? "Admin" : "Registered User"}</li>
        </ul>
      </div>
    )
  }

  const purchaseHistory = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header">Purchase history</h3>
        <ul className='list-group'>
          <li className="list-group-item">history</li>
        </ul>
      </div>
    )
  }
  return (
    <Layout className="p-5" title="Dashboard" description={`G'day ${name}!`}>
      <div className="row">
        <div className="col-3">
          {adminLinks()}
        </div>
        <div className="col-9">
          {adminInfo()}
          {purchaseHistory()}
        </div>
      </div>

    </Layout>
  )
}

export default AdminDashboard