import React, { useEffect, useState } from 'react'

import Card from './Card'
import Layout from './Layout'
import { read } from './apiCore'

const Product = (props) => {
  const [product, setProduct] = useState({})
  const [error, setError] = useState(false)

  const loadSingleProduct = productId => {
    read(productId).then(data => {
      if (data.error) {
        setError(data.error)
      } else {
        setProduct(data);
      }
    })
  }

  useEffect(() => {
    const productId = props.match.params.productId
    loadSingleProduct(productId)
  }, [])

  return (
    <Layout title={product && product.name} description={product && product.description && product.description.substring(0, 100)}>
      <div className="row d-flex justify-content-center">
        {product && product.description &&
          <div className="col-md-12 col-lg-6 mb-3">
            <Card product={product} showViewProductButton={false} /> </div>}
      </div>
    </Layout>
  )
}

export default Product;