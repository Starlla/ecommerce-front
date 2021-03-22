import Footer from './Footer';
import Menu from './Menu';
import React from 'react'

const Layout = ({ title = 'Title', description = 'Description', className, children }) => (
  <div>
    <Menu />
    <div className="bg-light main-header d-flex align-items-center">
      <div className="container">
        <div>
          <h2>{title}</h2>
          <p className="lead">{description}</p>
        </div>
      </div>
    </div>
    <div className="container pt-3">
      <div className={className}>{children}</div>
    </div>
    <Footer />
  </div>
);

export default Layout