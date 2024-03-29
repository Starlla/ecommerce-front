import Layout from '../core/Layout'
import { Link } from "react-router-dom"
import React from 'react'
import { isAuthenticated } from '../auth'

const Dashboard = () => {
  const { user: { _id, name, email, role } } = isAuthenticated()

  const userLinks = () => {
    return (
      <div className="card mb-5">
        <h4 className="card-header bg-primary">User Links</h4>
        <ul className='list-group'>
          <li className="list-group-item">
            <Link className="nav-link text-secondary" to="/cart">My Cart</Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link text-secondary" to="/profile/update">Update Profile</Link>
          </li>
        </ul>
      </div>
    )
  }

  const userInfo = () => {
    return (
      <div className="card mb-5">
        <h3 className="card-header bg-primary">User Information</h3>
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
        <h3 className="card-header bg-primary">Purchase history</h3>
        <ul className='list-group'>
          <li className="list-group-item">history</li>
        </ul>
      </div>
    )
  }
  return (
    <Layout className="p-5" title="Dashboard" description={`Hello ${name}!`}>
      <div className="row">
        <div className="col-3">
          {userLinks()}
        </div>
        <div className="col-9">
          {userInfo()}
          {purchaseHistory()}
        </div>
      </div>

    </Layout>
  )
}

export default Dashboard