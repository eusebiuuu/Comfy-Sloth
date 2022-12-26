import React, { useState } from 'react'
import styled from 'styled-components'
import { FaPlus, FaMinus } from 'react-icons/fa'

const AmountButtons = ({ id, stock }) => {
  const [counter, setCounter] = useState(1);

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
    <button onClick={handleCounterDecrement}>
      <FaMinus />
    </button>
    <h2>{counter}</h2>
    <button onClick={handleCounterIncrement}>
      <FaPlus />
    </button>
  </Wrapper>
}

const Wrapper = styled.div`
  display: grid;
  width: 140px;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
  align-items: center;
  h2 {
    margin-bottom: 0;
  }
  button {
    background: transparent;
    border-color: transparent;
    cursor: pointer;
    padding: 1rem 0;
    width: 2rem;
    height: 1rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

export default AmountButtons
