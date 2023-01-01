import React from 'react'
import styled from 'styled-components'
import { useFilterContext } from '../context/filter_context'
import { getUniqueValues, formatPrice } from '../utils/helpers'
import { FaCheck } from 'react-icons/fa'

const Filters = () => {
  const { filters, onFiltersChange, onFiltersClear, products } = useFilterContext();
  const { text, category, company, color, minPrice, maxPrice, price, shipping } = filters;
  const categories = getUniqueValues(products, 'category');
  const companies = getUniqueValues(products, 'company');
  const colors = getUniqueValues(products, 'colors');
  // console.log(categories, companies, colors);
  return <Wrapper>
    <div className='content'>
      <form onSubmit={(event) => event.preventDefault()}>
        <div className='form-control'>
          <input type='text' name='text' value={text} onChange={onFiltersChange}
            placeholder='Search' className='search-input' />
        </div>
        <div className='form-control'>
          <h5>Category</h5>
          <div>
            {categories.map(curCategory => {
              const curClass = curCategory.toLowerCase() === category ? 'active' : '';
              return <button name='category' className={curClass} value={curCategory}
                onClick={onFiltersChange} key={curCategory}>{curCategory}</button>
            })}
          </div>
        </div>
        <div className='form-control'>
          <label htmlFor='company'>
            <h5>Company</h5>
          </label>
          <select id='company' name='company' value={company}
            onChange={onFiltersChange}>
            {companies.map(company => {
              return <option key={company} className='company' value={company}>{company}</option>
            })}
          </select>
        </div>
        <div className='form-control'>
          <h5>Colors</h5>
          <div className='colors'>
            <button className={`${color === 'all' ? 'all-btn active' : 'all-btn '}`}
              name='color' data-color='all' onClick={onFiltersChange}>All</button>
            {colors.slice(1).map(curColor => {
              const additionalClass = curColor === color ? 'active' : '';
              return <button key={curColor} name='color' className={`${additionalClass} color-btn`}
                style={{ background: curColor }} data-color={curColor} onClick={onFiltersChange}>
                {additionalClass ? <FaCheck /> : null}
              </button>
            })}
          </div>
        </div>
        <div className='form-control'>
          <h5>Price</h5>
          <p className='shipping'>{formatPrice(price)}</p>
          <input type='range' name='price' value={price} onChange={onFiltersChange} min={minPrice} max={maxPrice} />
        </div>
        <div className='form-control shipping'>
          <label htmlFor='shipping'>
            Free shipping
          </label>
          <input type='checkbox' name='shipping' id='shipping'
            value={shipping} checked={shipping} onChange={onFiltersChange} />
        </div>
        <div className='form-control'>
          <button className='clear-btn' onClick={onFiltersClear}>Clear filters</button>
        </div>
      </form>
    </div>
  </Wrapper>
}

const Wrapper = styled.section`
  .form-control {
    margin-bottom: 1.25rem;
    h5 {
      margin-bottom: 0.5rem;
    }
  }
  .search-input {
    padding: 0.5rem;
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    letter-spacing: var(--spacing);
  }
  .search-input::placeholder {
    text-transform: capitalize;
  }

  button {
    display: block;
    margin: 0.25em 0;
    padding: 0.25rem 0;
    text-transform: capitalize;
    background: transparent;
    border: none;
    border-bottom: 1px solid transparent;
    letter-spacing: var(--spacing);
    color: var(--clr-grey-5);
    cursor: pointer;
  }
  .active {
    border-color: var(--clr-grey-5);
  }
  .company {
    background: var(--clr-grey-10);
    border-radius: var(--radius);
    border-color: transparent;
    padding: 0.25rem;
  }
  .colors {
    display: flex;
    align-items: center;
  }
  .color-btn {
    display: inline-block;
    width: 1rem;
    height: 1rem;
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
      font-size: 0.5rem;
      color: var(--clr-white);
    }
  }
  .all-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 0.5rem;
    opacity: 0.5;
  }
  .active {
    opacity: 1;
  }
  .all-btn .active {
    text-decoration: underline;
  }
  .price {
    margin-bottom: 0.25rem;
  }
  .shipping {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    text-transform: capitalize;
    column-gap: 0.5rem;
    font-size: 1rem;
    max-width: 200px;
  }
  .clear-btn {
    background: var(--clr-red-dark);
    color: var(--clr-white);
    padding: 0.25rem 0.5rem;
    border-radius: var(--radius);
  }
  @media (min-width: 768px) {
    .content {
      position: sticky;
      top: 1rem;
    }
  }
`

export default Filters
