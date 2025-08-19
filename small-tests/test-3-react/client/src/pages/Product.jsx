import {useContext} from 'react'
import {ProductContext} from './ProductContext.jsx'
import { useParams } from "react-router-dom";

function Product() {
  const { id } = useParams();
  const{products, addToCart} = useContext(ProductContext)

  if(!products) return null;
  const product = products.find((p) => p.id === Number(id))

    console.log(product)
  return (
    <main className='p-16 flex justify-center w-full '>
      <section className='flex flex-col border-4 rounded-2xl border-sky-800 justify-center w-2xl items-center *:p-8 *:text-xl'>
        <h2>{product.title}</h2>
        <img className='w-100 ' src={product.image} alt="product-image" />
        <p>{product.description}</p>
        <p>&euro;{(product.price).toFixed(2)}</p>
        <button onClick={()=>addToCart(product.id)} className='border-2 m-3 bg-sky-800 text-white cursor-pointer'>Add to Cart</button>
        
      </section>
      
    </main>
  )
}

export default Product
