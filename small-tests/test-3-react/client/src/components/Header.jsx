import { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import CategoriesNavBar from "../pages/CategoriesNavBar";
import { GiShoppingCart } from "react-icons/gi";
import {useContext} from 'react'
import {ProductContext} from '../pages/ProductContext.jsx'
import { FaRegUser } from "react-icons/fa";

function Header() {
  const{ cartQuantityCount} = useContext(ProductContext)

  const [showCategories, setShowCategories] = useState(false);
    const timeoutRef = useRef(null);

    const handleMouseEnter = () => {
      clearTimeout(timeoutRef.current);
      setShowCategories(true);
    };

    const handleMouseLeave = () => {
      timeoutRef.current = setTimeout(() => {
        setShowCategories(false);
      }, 300); 
    };

  return (
    <header className='w-full h-15 bg-sky-800 flex relative items-center'> 
      <nav className='w-full'>
        <ul className='flex items-center w-full h-full'>
          <li className='m-5 text-lime-300'><NavLink to="/">Home</NavLink></li>
          <li 
            className='m-5 text-lime-300 relative'
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <NavLink to="/products">Products</NavLink>
            {showCategories && (
              <div className={`absolute -left-25.5 top-full h-14 flex justify-center  items-center  mt-5 w-screen bg-white shadow-lg z-50 `} 
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
              <CategoriesNavBar />
            </div>
            )}
            
          </li>
          <li className='m-5 text-lime-300'><NavLink to="/about">About</NavLink></li>
        </ul>
      </nav>

      <NavLink to="/login" className="text-lime-300 mr-4 "> <FaRegUser size={22} /> </NavLink>    
      <div className="relative mr-8">
  
  <NavLink><GiShoppingCart size={30} className="text-lime-300" /></NavLink>
  <span className="absolute -top-2 right-1  text-lime-300 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
    {cartQuantityCount}
  </span>
</div>
    </header>
  )
}

export default Header;