import { Link, withRouter } from 'react-router-dom'

import React from 'react'

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
    <li className="nav-item">
      <Link className="nav-link" to="/signin" style={isActive(history, '/signin')}>Signin</Link>
    </li>
    <li className="nav-item">
      <Link className="nav-link" to="/signup" style={isActive(history, '/signup')}>Signup</Link>
    </li>
  </url>

export default withRouter(Menu);