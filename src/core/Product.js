import React, { useEffect, useState } from 'react'
import { listRelated, read } from './apiCore'

import Card from './Card'
import Layout from './Layout'

const Product = (props) => {
  const [product, setProduct] = useState({})
  const [relatedProduct, setRelatedProduct] = useState([]);
  const [error, setError] = useState(false)

  const loadSingleProduct = productId => {
    read(productId).then(data => {
      if (data.error) {
        setError(data.error)
      } else {
        setProduct(data);
        listRelated(data._id).then(response => {
          if (response.error) {
            setError(response.error)
          } else {
            console.log(response)
            setRelatedProduct(response);
          }
        })
      }
    })
  }

  useEffect(() => {
    const productId = props.match.params.productId
    loadSingleProduct(productId)
  }, [])

  return (
    <Layout title={product && product.name} description={product && product.description && product.description.substring(0, 100)}>
      <div className="row">
        <div className="col-8 mt-5">
          {product && product.description &&
            <Card product={product} showViewProductButton={false} />
          }
        </div>
        <div className="col-4 mt-3">
          <h4>Related products</h4>
          <div className="row">
            {relatedProduct && relatedProduct.map((p, i) => (
              <div key={i} className="col-lg-12 col-md-12 mb-3">
                <Card product={p} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Product;