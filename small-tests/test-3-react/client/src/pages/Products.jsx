import {useContext} from 'react'
import {ProductContext} from './ProductContext.jsx'
import { NavLink } from 'react-router-dom'


function Products() {
  const {products} = useContext(ProductContext)
  console.log(products)
  return (
    <main>
      
        <ul className='flex flex-wrap gap-6 m-12'>
          {products?.map((product) => (
            <NavLink key={product.id} to={`/product/${product.id}`}>
          <li className='border-2 w-xs h-100 border-sky-800 rounded-2xl m-5 p-3 shadow-lg shadow-gray-600 flex flex-col justify-between items-center' 
          
          
          > {" "}
            <img className='w-54 h-50' src={product.image} alt="" />
              <h2>{product.title}</h2>
              <h4 className='tracking-wider'>&euro;{(product.price).toFixed(2)}</h4>
          </li>
          </NavLink>
          ))}
        </ul>
   
      
    </main>
  )
}

export default Products
