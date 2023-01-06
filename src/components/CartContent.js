import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import CartColumns from './CartColumns'
import CartItem from './CartItem'
import CartTotals from './CartTotals'
import { handleCartClear } from '../features/cart/cartSlice'
import { useDispatch, useSelector } from 'react-redux'

const CartContent = () => {
  const dispatch = useDispatch();
  const { cart } = useSelector((store) => store.cart);
  // console.log(cart);
  return <Wrapper className='section section-center'>
    <CartColumns />
    <hr />
    {cart.map((cartItem, index) => {
      return <CartItem {...cartItem} key={index} />
    })}
    <hr />
    <div className='link-container'>
      <Link to='/products' className='link-btn'>Continue shopping</Link>
      <button className='link-btn clear-btn' onClick={() => dispatch(handleCartClear())}>Clear shopping cart</button>
    </div>
    <CartTotals />
  </Wrapper>
}
const Wrapper = styled.section`
  .link-container {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
  }
  .link-btn {
    background: transparent;
    border-color: transparent;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
    background: var(--clr-primary-5);
    color: var(--clr-white);
    border-radius: var(--radius);
    letter-spacing: var(--spacing);
    font-weight: 400;
    cursor: pointer;
  }
  .clear-btn {
    background: var(--clr-black);
  }
`
export default CartContent
