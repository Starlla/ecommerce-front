import React, { useEffect, useState } from 'react'
import { getCategories, getFilteredProducts } from './apiCore'

import Card from './Card'
import Checkbox from './CheckBox'
import Layout from './Layout'
import RadioBox from './RadioBox'
import { prices } from './fixedPrice'

const Shop = () => {
  const [myFilters, setMyFilters] = useState({
    filters: { category: [], price: [] }
  })
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  const [limit, setLimit] = useState(6);
  const [skip, setSkip] = useState(0);
  const [size, setSize] = useState(0);
  const [filteredResults, setFilteredResults] = useState([]);

  const init = () => {
    getCategories().then(data => {
      if (data.error) {
        setError(data.error)
      } else {
        setCategories(data)
      }
    })
  }

  useEffect(() => {
    init()
    loadFilteredResults(skip, limit, myFilters.filters);
  }, [])

  const handleFitlers = (filters, filterBy) => {
    const newFilters = { ...myFilters }
    newFilters.filters[filterBy] = filters;
    if (filterBy === "price") {
      let priceValues = handlePrice(filters)
      newFilters.filters[filterBy] = priceValues;
    }
    loadFilteredResults(myFilters.filters)
    setMyFilters(newFilters)
  }

  const handlePrice = value => {
    const data = prices
    let array = []

    for (let key in data) {
      if (data[key]._id === parseInt(value)) {
        array = data[key].array
      }
    }
    return array;
  }

  const loadFilteredResults = (newFilters) => {
    getFilteredProducts(skip, limit, newFilters).then(data => {
      if (data.error) {
        setError(data.error)
      } else {
        setFilteredResults(data.data);
        setSize(data.size);
        setSkip(0);
      }
    })
  }

  const loadMore = () => {
    let toSkip = skip + limit
    getFilteredProducts(toSkip, limit, myFilters.filters).then(data => {
      if (data.error) {
        setError(data.error)
      } else {
        setFilteredResults([...filteredResults, ...data.data]);
        setSize(data.size)
        setSkip(0)
      }
    })
  }

  const loadMoreButton = () => {
    return (
      size > 0 && size >= limit && (
        <button onClick={loadMore} className="btn btn-secondary mb-5">Load More</button>
      )
    )
  }

  return (
    <Layout title="Shop Page" description="Search and find products of your choice">
      <div className="row">
        <div className="col-3 mt-5">
          <h4>Filter by category</h4>
          <ul>
            <Checkbox categories={categories} handleFilters={filters => handleFitlers(filters, "category")} />
          </ul>
          <h4>Filter by price</h4>
          <div>
            <RadioBox prices={prices} handleFilters={filters => handleFitlers(filters, "price")} />
          </div>
        </div>
        <div className="col-9">
          <h2 className="mb-4">Products</h2>
          <div className="row">
            {filteredResults && filteredResults.map((product, i) => (
              <div key={i} className="col-md-12 col-lg-6 mb-3">
                <Card product={product} />
              </div>
            ))}
          </div>
          <hr />
          {loadMoreButton()}
        </div>
      </div>
    </Layout>
  )
}

export default Shop;
