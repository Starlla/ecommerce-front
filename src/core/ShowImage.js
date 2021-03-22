import { API } from '../config'
import React from 'react'

const ShowImage = ({ item, url }) => (
  <div className="product-image d-flex justify-content-center">
    <img src={`${API}/${url}/photo/${item._id}`} alt="" className="mb-3" style={{ maxHeigh: "150px", maxWidth: "150px" }} />
  </div>
)


export default ShowImage;