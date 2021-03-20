import React, { useEffect, useState } from 'react'

import Card from './Card'
import Layout from './Layout'
import { getProducts } from './apiCore'

const Home = () => {
  const [productsBySell, setProductsBySell] = useState([])
  const [productsByArrival, setProductsByArrival] = useState([])
  const [error, setError] = useState(false)

  const loadProductsBySell = () => {
    getProducts('sold').then(data => {
      if (data && data.error) {
        setError(data.error)
      } else {
        setProductsBySell(data)
      }
    })
  }

  const loadProductsByArrival = () => {
    getProducts('createdAt').then(data => {
      if (data && data.error) {
        setError(data.error)
      } else {
        setProductsByArrival(data)
      }
    })
  }

  useEffect(() => {
    loadProductsByArrival();
    loadProductsBySell();
  }, [])

  return (
    <Layout title="Home Page" description="Node React E-Commerce App">
      <h2 className="my-3 ml-4">Best Sellers</h2>
      {productsBySell.map((product, i) => (<Card key={i} product={product} />))}
      {productsByArrival.map((product, i) => (<Card key={i} product={product} />))}
    </Layout>
  )
}


export default Home;