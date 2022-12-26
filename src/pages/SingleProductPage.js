import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useProductsContext } from '../context/products_context'
import { single_product_url as url } from '../utils/constants'
import { formatPrice } from '../utils/helpers'
import {
  Loading,
  Error,
  ProductImages,
  AddToCart,
  Stars,
  PageHero,
} from '../components'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const SingleProductPage = () => {
  const { getSingleProduct, singleProduct: product, singleProductLoading, singleProductError } = useProductsContext();
  const { id } = useParams();
  const navigation = useNavigate();

  useEffect(() => {
    (async () => {
      await getSingleProduct(`${url}${id}`);
    })();
  }, [id]);

  useEffect(() => {
    if (singleProductError) {
      setTimeout(() => {
        navigation('/', { replace: true });
      }, 2000);
    }
  }, [singleProductError]);

  if (singleProductLoading) {
    return <Wrapper>
      <Loading />
    </Wrapper>
  } else if (singleProductError) {
    return <Wrapper>
      <Error />
    </Wrapper>
  }
  const { name, price, stars, images, id: productID, company, description, reviews, stock} = product;
  return <Wrapper>
    <PageHero title={['products', name]} />
    <div className='section section-center page'>
      <Link to='/products' className='btn'>Back to products</Link>
      <div className='product-center'>
        <ProductImages images={images} />
        <section className='content'>
          <h2>{name}</h2>
          <Stars stars={stars} reviews={reviews} />
          <h5 className='price'>{formatPrice(price)}</h5>
          <p className='desc'>{description}</p>
          <div className='info'>
            <span>Available:</span>
            {stock > 0 ? `${stock} pieces remained in stock` : 'Out of stock'}
          </div>
          <div className='info'>
            <span>ProductID:</span>
            {productID}
          </div>
          <div className='info'>
            <span>Company:</span>
            {company}
          </div>
          <hr />
          {stock > 0 && <AddToCart product={product} />}
        </section>
      </div>
    </div>
  </Wrapper>
}

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`

export default SingleProductPage
