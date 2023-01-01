import React, { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'
import { useCartContext } from '../context/cart_context'
import AmountButtons from './AmountButtons'

const AddToCart = ({ product }) => {
  const { onCartAddition } = useCartContext();
  const { id, stock, colors } = product;
  const [mainColor, setMainColor] = useState(colors[0]);
  const [counter, setCounter] = useState(1);

  const handleColorChange = (color) => {
    setMainColor(color);
  }

  const handleCounterIncrement = () => {
    setCounter(prev => {
      return Math.min(prev + 1, stock);
    });
  }

  const handleCounterDecrement = () => {
    setCounter(prev => {
      return Math.max(1, prev - 1);
    });
  }

  return <Wrapper>
    <div className='colors'>
      <span>Colors:</span>
      <div>
        {colors.map((color, index) => {
          if (color === mainColor) {
            return <button key={index} style={{background: color}} className='color-btn active' 
            onClick={() => handleColorChange(color)}>
              <FaCheck />
            </button>
          }
          return <button key={index} style={{background: color}} className='color-btn' 
          onClick={() => handleColorChange(color)}></button>
        })}
      </div>
    </div>
    <div className='btn-container'>
      <AmountButtons onCounterIncrement={handleCounterIncrement} 
        counter={counter} onCounterDecrement={handleCounterDecrement} />
    </div>
    <Link to='/cart' className='btn' onClick={() => onCartAddition({ id, color: mainColor, amount: counter, product })}>
      Add to cart
    </Link>
  </Wrapper>
}

const Wrapper = styled.section`
  margin-top: 2rem;
  .colors {
    display: grid;
    grid-template-columns: 125px 1fr;
    align-items: center;
    margin-bottom: 1rem;
    span {
      text-transform: capitalize;
      font-weight: 700;
    }
    div {
      display: flex;
    }
  }
  .color-btn {
    display: inline-block;
    width: 1.5rem;
    height: 1.5rem;
    border-radius: 50%;
    background: #222;
    margin-right: 0.5rem;
    border: none;
    cursor: pointer;
    opacity: 0.5;
    display: flex;
    align-items: center;
    justify-content: center;
    svg {
      font-size: 0.75rem;
      color: var(--clr-white);
    }
  }
  .active {
    opacity: 1;
  }
  .btn-container {
    margin-top: 2rem;
  }
  .btn {
    margin-top: 1rem;
    width: 140px;
  }
`
export default AddToCart;
