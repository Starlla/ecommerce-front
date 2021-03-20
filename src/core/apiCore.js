import{API} from "../config"

export const getProducts = (sortBy) =>{
  return fetch(`${API}/products?sortBy=${sortBy}&order=desc&limi=6`,{
    method: 'GET'
  })
  .then(response => {
    return response.json()
  })
  .catch(err => console.log(err));
}