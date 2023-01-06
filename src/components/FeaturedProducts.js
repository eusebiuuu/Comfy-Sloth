import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import Error from './Error'
import Loading from './Loading'
import Product from './Product'
import { useSelector } from 'react-redux'

const FeaturedProducts = () => {
  const { featuredProducts, productsLoading, productsError } = useSelector((store) => store.products);
  if (productsLoading) {
    return <Wrapper>
      <Loading />
    </Wrapper>
  } else if (productsError) {
    return <Wrapper>
      <Error />
    </Wrapper>
  } else {
    return <Wrapper className='section'>
      <section className='title'>
        <h2>Our featured products</h2>
        <div className='underline'></div>
      </section>
      <div className='section-center featured'>
        {featuredProducts.slice(0, 3).map(product => {
          return <Product key={product.id} {...product} />
        })}
      </div>
      <Link to='/products' className='btn'>products list</Link>
    </Wrapper>
  }
}

const Wrapper = styled.section`
  background: var(--clr-grey-10);
  .featured {
    margin: 4rem auto;
    display: grid;
    gap: 2.5rem;
    img {
      height: 225px;
    }
  }
  .btn {
    display: block;
    width: 148px;
    margin: 0 auto;
    text-align: center;
  }
  @media (min-width: 576px) {
    .featured {
      grid-template-columns: repeat(auto-fit, minmax(360px, 1fr));
    }
  }
`

export default FeaturedProducts
