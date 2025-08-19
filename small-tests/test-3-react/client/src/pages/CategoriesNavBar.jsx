import {useContext} from 'react'
import {ProductContext} from './ProductContext.jsx'
import {NavLink} from 'react-router-dom'
import '../../src/App.css'

function CategoriesNavBar() {
    const{products} = useContext(ProductContext)
    
    if(!products) return null;
    const onlyCategories = [...new Set(products.map(p => p.category))]
  return (
    <aside className='flex'>
      <ul>
        <li className='m-3 p-5 gap-5'>
            {onlyCategories.map(category => (
                <NavLink key={category} to={`category/${encodeURIComponent(category)}`}  className='m-3 p-15 text-sky-800 gap-12'>{category}</NavLink>
            ))}
            
        </li>
      </ul>
    </aside>
  )
}

export default CategoriesNavBar
