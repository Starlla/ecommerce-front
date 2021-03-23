import { Link, Redirect } from 'react-router-dom';
import React, { useState } from 'react';
import { addItem, removeItem, updateItem } from './cartHelper';

import ShowImage from './ShowImage';
import moment from 'moment';

const Card = ({ product, showViewProductButton = true, showAddToCart = true, cartUpdate = false, showRemoveProduct = false, run = undefined, setRun = f => f }) => {
  const [redirect, setRedirect] = useState(false)
  const [count, setCount] = useState(product.count);

  const showViewButton = (showViewProductButton) => {
    return showViewProductButton &&
      <Link to={`/product/${product._id}`}>
        <button className="btn btn-primary my-2">
          View Product
      </button>
      </Link>
  }

  const addToCart = () => {
    addItem(product, () => {
      setRedirect(true)
    })
  }

  const shouldRedirect = redirect => {
    if (redirect) {
      return <Redirect to="/cart" />
    }
  }

  const showAddToCartButton = (showAddToCart) => {
    return (
      showAddToCart && <button onClick={addToCart} className="btn btn-info my-2 ml-2">
        Add to cart
      </button>
    )
  }

  const handleChange = productId => event => {
    setCount(event.target.value < 1 ? 1 : event.target.value)
    if (event.target.value >= 1) {
      updateItem(productId, event.target.value)
    }
    setRun(!run)
  }

  const showCartUpdateOptions = cartUpdate => {
    return cartUpdate && <div><div className="input-group mb-3">
      <div className="input-group-prepend"><span className="input-group-text">Addjust Quantity</span></div>
      <input type="number" className="form-control" value={count} onChange={handleChange(product._id)} />

    </div></div>
  }

  const showStock = (quantity) => {
    return quantity > 0 ? (
      <span className="badge badge-info badge-pill">In Stock</span>
    ) : (<span className="badge badge-warning badge-pill">Out of Stock</span>)
  }

  const showRemoveProductButton = (showRemoveProduct) => (
    showRemoveProduct && (
      <button onClick={() => { removeItem(product._id); setRun(!run) }} className="btn btn-info my-2 ml-2">
        Remove
      </button>
    )
  )

  return (
    <div className="card border-3 border-secondary">
      <div className="card-header bg-primary"><strong>{product.name}</strong></div>
      <div className="card-body">
        {shouldRedirect(redirect)}
        <ShowImage item={product} url="product" />
        <div className="ml-2">
          <p>{product.description.substring(0, 30)}</p>
          <p>$ {product.price}</p>
          <p>Category: {product.category && product.category.name}</p>
          <div className="d-flex">
            {showStock(product.quantity)}
            <small className="ml-2">Added on {moment(product.createdAt).fromNow()}</small>
          </div>
        </div>
        {showViewButton(showViewProductButton)}
        {showRemoveProductButton(showRemoveProduct)}
        {showAddToCartButton(showAddToCart)}
        {showCartUpdateOptions(cartUpdate)}

      </div>
    </div>
  )
}

export default Card;