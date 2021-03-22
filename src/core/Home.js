import React, { useEffect, useState } from 'react'

import Card from './Card'
import Layout from './Layout'
import Search from './Search'
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
      <Search />
      <h2 className="my-3 ml-4">New Arrivals</h2>
      <div className="row">
        {productsByArrival.map((product, i) => (
          <div key={i} className="col-md-6 col-lg-4 mb-3">
            <Card product={product} />
          </div>
        ))}

      </div>
      <h2 className="my-3 ml-4">Best Sellers</h2>
      <div className="row">

        {productsBySell.map((product, i) => (
          <div key={i} className="col-md-6 col-lg-4 mb-3">
            <Card product={product} />
          </div>
        ))}

      </div>
    </Layout>
  )
}


export default Home;