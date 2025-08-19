import React from 'react'
import { useParams } from 'react-router-dom'
import { useContext } from 'react'
import { ProductContext } from './ProductContext'
import { FcLike } from "react-icons/fc";



function CategoryPage() {
    const { category } = useParams();
    const { products, addToCart, handleLike, productLikes  } = useContext(ProductContext);
   

    const filteredCategory = products.filter((prod) => prod.category === category)


    

  return (
    <main className='flex flex-col w-full justify-center items-center '>
        <h1 className='font-bold text-3xl p-10 m-10'>Category : {category}</h1>
        <ul className=' flex flex-row flex-wrap'>
            {filteredCategory.map((prod) => (
                <li key={prod.id} className='border-2 w-xs h-118 border-sky-800 rounded-2xl m-5 p-3 shadow-lg shadow-gray-600 flex flex-col justify-between'>
                    <p>{prod.title}</p>
                    <img className='w-xs max-w-2xs h-67' src={prod.image} alt={prod.title} />
                    <p>&euro;{(prod.price).toFixed(2)}</p>
                   <span className='flex items-center *:m-1 '> <FcLike onClick={()=>{handleLike(prod.id)}}/><span className='pt-1'>{productLikes[prod.id] || 0}</span></span>
                    <button onClick={() => {addToCart(prod.id)}} className='border w-32 m-auto'>Add to Cart</button>
                </li>
            ))}
        </ul>
    </main>
  )
}


export default CategoryPage
