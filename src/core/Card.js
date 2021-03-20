import { Link } from 'react-router-dom'
import React from 'react'

const Card = ({ product }) => {
  return (
    <div className="col-4 mb-3">
      <div className="card border-3 border-secondary">
        <div className="card-header bg-primary"><strong>{product.name}</strong></div>
        <div className="card-body">
          <p>{product.description}</p>
          <p>$ {product.price}</p>
          <Link to="/">
            <button className="btn btn-primary my-2">
              View Product
          </button>
          </Link>
          <button className="btn btn-info my-2 ml-2">
             Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default Card;