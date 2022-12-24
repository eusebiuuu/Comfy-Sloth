import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'
import styled from 'styled-components'
import {
  AboutPage as About,
  CheckoutPage,
  CartPage,
  HomePage as Home,
  ErrorPage,
  ProductsPage,
  SingleProductPage,
  PrivateRoute
} from './pages'

function App() {
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
        <Route path='/checkout' element={<CheckoutPage />} />
        <Route path='*' element={<ErrorPage />} />
      </Routes>
      <Footer />
    </Router>
  </>);
}

export default App;
