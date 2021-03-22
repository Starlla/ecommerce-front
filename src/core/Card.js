import { Link } from 'react-router-dom'
import React from 'react'
import ShowImage from './ShowImage';
import moment from 'moment'

const Card = ({ product, showViewProductButton = true }) => {
  const showViewButton = (showViewProductButton) => {
    return showViewProductButton &&
      <Link to={`/product/${product._id}`}>
        <button className="btn btn-primary my-2">
          View Product
      </button>
      </Link>
  }
  return (
    <div className="card border-3 border-secondary">
      <div className="card-header bg-primary"><strong>{product.name}</strong></div>
      <div className="card-body">
        <ShowImage item={product} url="product" />
        <div className="ml-2">
          <p>{product.description.substring(0, 30)}</p>
          <p>$ {product.price}</p>
          <p>Category: {product.category && product.category.name}</p>
          <div>
            <small>Added on {moment(product.createdAt).fromNow()}</small>
          </div>
        </div>
        {showViewButton(showViewProductButton)}
        <button className="btn btn-info my-2 ml-2">
          Add to cart
          </button>
      </div>
    </div>
  )
}

export default Card;