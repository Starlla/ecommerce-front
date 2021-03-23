import React, { useEffect, useState } from 'react'

import Card from './Card'
import Checkout from './Checkout'
import Layout from './Layout'
import { Link } from 'react-router-dom'
import { getCart } from './cartHelper'

const Cart = (props) => {
  const [run, setRun] = useState(false);
  const [items, setItems] = useState([])

  useEffect(() => {
    setItems(getCart())
  }, [run])

  const showItems = items => {
    return (
      <div>
        <h2 className="ml-2 mb-4 mt-2">Your cart has {`${items.length}`} items</h2>
        <hr />
        {items.map((product, i) => (
          <div key={i} className="col-12 mt-3">
            <Card product={product} showAddToCart={false} cartUpdate={true} showRemoveProduct={true} run={run} setRun={setRun} />
          </div>
        ))}
      </div>
    )
  }

  const noItemsMessage = () => (
    <h2>Your cart is empty. <br /> <Link to="/shop">Continue shopping</Link></h2>
  )

  return (
    <Layout title="Shopping Cart" description="Checkout or continue shopping">
      <div className="row">
        <div className="col-6 ">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        <div className="col-6">
          <h2 className="mb-4 mt-2">Your cart summary</h2>
          <hr />
          <Checkout products={items} setRun={setRun} run={run} />
        </div>
      </div>
    </Layout>
  )
}

export default Cart;