import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import './index.css'
import App from './App'
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductContextProvider from './pages/ProductContext';
import Product from './pages/Product';
import ProductLayout from './components/ProductLayout';
import CategoryPage from './pages/CategoryPage';
import Login from './pages/Login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: "/about",
        element: <About />
      },
      {
        path: "/products",
        element: <Products />,
      }, 
      {
        path: "product/:id",
        element: <Product />
      },
      {
        path: "category/:category",
        element: <CategoryPage />
      },
      {
        path: "/login",
        element: <Login />
      }
        
      
    ]
  }
])


createRoot(document.getElementById('root')).render(
  <ProductContextProvider>
    <RouterProvider router={router} />
  </ProductContextProvider>,
)
