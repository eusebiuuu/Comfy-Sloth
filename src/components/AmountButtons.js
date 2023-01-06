import React from 'react'
import styled from 'styled-components'
import { FaPlus, FaMinus } from 'react-icons/fa'

const AmountButtons = ({ counter, onCounterIncrement, onCounterDecrement }) => {
  return <Wrapper>
    <button onClick={onCounterDecrement}>
      <FaMinus />
    </button>
    <h2>{counter}</h2>
    <button onClick={onCounterIncrement}>
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
