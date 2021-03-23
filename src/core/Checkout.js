import React, { useEffect, useState } from 'react'
import { createOrder, getBrainTreeClientToken, processPayment } from './apiCore'

import DropIn from 'braintree-web-drop-in-react'
import { Link } from 'react-router-dom'
import { emptyCart } from './cartHelper'
import { isAuthenticated } from '../auth'

const Checkout = ({ products, setRun = f => f, run = undefined }) => {

  const [data, setData] = useState({
    success: false,
    clientToken: null,
    error: '',
    instance: {},
    address: '',
    loading: false,
  })

  const userId = isAuthenticated() && isAuthenticated().user._id
  const token = isAuthenticated() && isAuthenticated().token

  let deliverAddress = data.address;

  const getToken = (userId, token) => {
    return getBrainTreeClientToken(userId, token).then(response => {
      console.log(response)
      if (response.error) {
        setData({ ...data, error: response.error })
      } else {
        setData({ clientToken: response.clientToken })
      }
    })
  }

  useEffect(() => {
    getToken(userId, token)
  }, [])

  const getTotal = () => {
    return products.reduce((currentValue, nextValue) => {
      return currentValue + nextValue.count * nextValue.price
    }, 0)
  }
  const showCheckout = () => (isAuthenticated() ? (
    <div> {showDropIn()}</div>
  ) : (<Link to="/signin"> <button className="btn btn-primary mt-3">Sign in to checkout</button></Link>))

  const buy = () => {
    setData({ loading: true });
    let nonce;
    let getNonce = data.instance.requestPaymentMethod()
      .then(data => {
        nonce = data.nonce
        // console.log(nonce, getTotal(products))
        const paymentData = { paymentMethodNonce: nonce, amount: getTotal(products) }
        processPayment(userId, token, paymentData)
          .then(response => {
            const createOrderData = {
              products: products,
              transaction_id: response.transaction_id,
              amount: response.transaction.amount,
              address: deliverAddress
            }

            createOrder(userId, token, createOrderData)

            setData({ ...data, success: true });
            emptyCart(() => {
              setRun(!run);
              console.log('Payment successful! Cart Empted!')
              setData({ loading: false })
            })
          })
          .catch(error => console.log(error))
      })
      .catch(error => {
        // console.log('dropin error', error)
        setData({ loading: false })
        setData({ ...data, error: error.message })
      })
  }

  const handleAddress = event => {
    setData({ ...data, address: event.target.value })
  }

  const showDropIn = () => (
    <div>
      {data.clientToken !== null && products.length > 0 ? (
        <div onBlur={() => setData({ ...data, error: '' })}>
          <div>
            <div className="form-group mb-3">
              <label className="text-muted">Deliver address:</label>
              <textarea className="form-control" value={data.address} placeholder="Your Address..." onChange={handleAddress}></textarea>
            </div>
            <DropIn options={{
              authorization: data.clientToken,
              paypal: {
                flow: 'vault'
              }
            }} onInstance={instance => (data.instance = instance)} />
          </div>

          <button onClick={buy} className="btn btn-info btn-block">Pay</button>

        </div>
      ) : null}
    </div>
  )

  const showError = error => (
    <div className="aler alert-danger" style={{ display: error ? '' : 'none' }}>
      {error}
    </div>
  )
  const showSuccess = success => (
    <div className="aler alert-success" style={{ display: success ? '' : 'none' }}>
      Your payment was successful!
    </div>
  )
  const showLoading = loading => (
    loading && (<div className="aler alert-success" >
      Loading...
    </div>)
  )

  return <div style={{height:'28vh'}}>
    <h2>Total : ${getTotal()}</h2>
    {showLoading(data.loading)}
    {showSuccess(data.success)}
    {showError(data.error)}
    {showCheckout()}
  </div>
}
export default Checkout;