import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'
import { useAuth0 } from '@auth0/auth0-react'
import { handleTotalsCount } from './features/cart/cartSlice'
import {
  AboutPage as About,
  CheckoutPage,
  CartPage,
  HomePage as Home,
  ErrorPage,
  ProductsPage,
  SingleProductPage,
} from './pages'
import { useDispatch, useSelector } from 'react-redux'
import { getAllProducts } from './features/products/productsSlice'
import { products_url as url } from './utils/constants'

function App() {
  const { user } = useAuth0();
  const { cart } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
    dispatch(handleTotalsCount());
    // eslint-disable-next-line
  }, [cart]);

  useEffect(() => {
    dispatch(getAllProducts(url));
    // eslint-disable-next-line
  }, []);

  return (<>
    <Router>
      <Navbar />
      <Sidebar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/products' element={<ProductsPage />} />
        <Route path='/products/:id' element={<SingleProductPage />} />
        <Route path='/checkout' element={user ? <CheckoutPage /> : <ErrorPage />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      <Footer />
    </Router>
  </>);
}

export default App;
