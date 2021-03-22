import { Link, withRouter } from 'react-router-dom'
import React, { Fragment } from 'react'
import { isAuthenticated, signout } from '../auth'

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#080808', border: '3px solid black' }
  } else {
    return { color: '#080808' }
  }
}

const Menu = ({ history }) =>
  <nav className="navbar bg-primary border-bottom border-5 border-secondary">
    <div className="container">
      <ul className="nav nav-tabs p-3 ml-auto border-0">
        <li className="nav-item">
          <Link className="nav-link font-weight-bold" to="/" style={isActive(history, '/')}>Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link font-weight-bold" to="/shop" style={isActive(history, '/shop')}>Shop</Link>
        </li>
        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className="nav-item">
            <Link className="nav-link font-weight-bold" to="/user/dashboard" style={isActive(history, '/user/dashboard')}>Dashboard</Link>
          </li>
        )}
        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className="nav-item">
            <Link className="nav-link font-weight-bold" to="/admin/dashboard" style={isActive(history, '/admin/dashboard')}>Dashboard</Link>
          </li>
        )}
        {!isAuthenticated() && (
          <Fragment>
            <li className="nav-item">
              <Link className="nav-link font-weight-bold" to="/signin" style={isActive(history, '/signin')}>Signin</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link font-weight-bold" to="/signup" style={isActive(history, '/signup')}>Signup</Link>
            </li>
          </Fragment>
        )}
        {isAuthenticated() && (
          <li className="nav-item">
            <span className="nav-link font-weight-bold" onClick={() => signout(() => {
              history.push("/");
            })} style={{ cursor: 'pointer' }}>Signout</span>
          </li>
        )}
      </ul>
    </div>
  </nav>

export default withRouter(Menu);