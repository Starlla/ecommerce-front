import React, { Fragment, useEffect, useState } from 'react'

const RadioBox = ({ prices, handleFilters }) => {
  const [value, setValue] = useState(0)

  const handleChange = (event) => {
    handleFilters(event.target.value)
    setValue(event.target.value);
  }

  return prices.map((p, i) => (
    <div key={i}>
      <input type="radio" name={p} value={`${p._id}`} onChange={handleChange} className="mr-2 ml-4" />
      <label className="form-check-lable">{p.name}</label>
    </div>
  ))
}

export default RadioBox;

