import { Link, withRouter } from 'react-router-dom'
import React, { Fragment } from 'react'
import { isAuthenticated, signout } from '../auth'

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: '#ff9900' }
  } else {
    return { color: '#ffffff' }
  }
}

const Menu = ({ history }) =>
  <url className="nav nav-tabs bg-primary">
    <li className="nav-item">
      <Link className="nav-link" to="/" style={isActive(history, '/')}>Home</Link>
    </li>
    {isAuthenticated() && isAuthenticated().user.role === 0 && (
      <li className="nav-item">
        <Link className="nav-link" to="/user/dashboard" style={isActive(history, '/user/dashboard')}>Dashboard</Link>
      </li>
    )}
    {isAuthenticated() && isAuthenticated().user.role === 1 && (
      <li className="nav-item">
        <Link className="nav-link" to="/admin/dashboard" style={isActive(history, '/admin/dashboard')}>Dashboard</Link>
      </li>
    )}
    {!isAuthenticated() && ( 
      <Fragment>
        <li className="nav-item">
          <Link className="nav-link" to="/signin" style={isActive(history, '/signin')}>Signin</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/signup" style={isActive(history, '/signup')}>Signup</Link>
        </li>
      </Fragment>
    )}
    {isAuthenticated() && (
      <li className="nav-item">
        <span className="nav-link" onClick={() => signout(() => {
          history.push("/");
        })} style={{ cursor: 'pointer', color: '#ffffff' }}>Signout</span>
      </li>
    )}
  </url>

export default withRouter(Menu);