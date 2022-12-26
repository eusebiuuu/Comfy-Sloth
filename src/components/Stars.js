import React from 'react'
import styled from 'styled-components'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'

const Stars = ({ stars, reviews }) => {
  const actualStars = Array.from({ length: 5 }, (_, index) => {
    if (stars > index + 0.5) {
      return <span key={index}>
        <BsStarFill />
      </span>
    } else if (stars > index) {
      return <span key={index}>
        <BsStarHalf />
      </span>
    }
    return <span key={index}>
      <BsStar />
    </span>
  })
  return <Wrapper>
    <div className='stars'>
      {actualStars}
    </div>
    <p className='reviews'>
      from {reviews} reviews
    </p>
  </Wrapper>
}

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  span {
    color: #ffb900;
    font-size: 1rem;
    margin-right: 0.25rem;
  }
  p {
    margin-left: 0.5rem;
    margin-bottom: 0;
  }
  margin-bottom: 0.5rem;
`
export default Stars
