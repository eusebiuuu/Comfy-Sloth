import React from 'react'
import { useFilterContext } from '../context/filter_context'
import { BsFillGridFill, BsList } from 'react-icons/bs'
import styled from 'styled-components'

const Sort = () => {
  const { filteredProducts, gridView, setGridView, setListView, sortCriteria, onSortCriteriaChange } = useFilterContext();
  return <Wrapper>
    <div className='btn-container'>
      <button className={`${gridView ? ' active' : ''}`} onClick={setGridView}>
        <BsFillGridFill />
      </button>
      <button className={`${gridView ? '' : ' active'}`} onClick={setListView}>
        <BsList />
      </button>
    </div>
    <p>{filteredProducts.length} products matched</p>
    <hr />
    <form>
      <label htmlFor='sort'>
        Sort by
      </label>
      <select id='sort' name='sortCriteria' className='sort-input' value={sortCriteria} onChange={onSortCriteriaChange}>
        <option value='price-lowest'>price (lowest)</option>
        <option value='price-highest'>price (highest)</option>
        <option value='name-az'>from A to Z</option>
        <option value='name-za'>from Z to A</option>
      </select>
    </form>
  </Wrapper>
}

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: auto auto 1fr auto;
  align-items: center;
  margin-bottom: 2rem;
  column-gap: 2rem;
  @media (max-width: 576px) {
    display: grid;
    grid-template-columns: 1fr;
    row-gap: 0.75rem;
    .btn-container {
      width: 50px;
    }
    label {
      display: inline-block;
      margin-right: 0.5rem;
    }
  }
  @media (min-width: 768px) {
    column-gap: 2rem;
  }
  p {
    text-transform: capitalize;
    margin-bottom: 0;
  }

  .btn-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    column-gap: 0.5rem;
    button {
      background: transparent;
      border: 1px solid var(--clr-black);
      color: var(--clr-black);
      width: 1.5rem;
      border-radius: var(--radius);
      height: 1.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      svg {
        font-size: 1rem;
      }
    }
    .active {
      background: var(--clr-black);
      color: var(--clr-white);
    }
  }

  .sort-input {
    border-color: transparent;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 0.25rem 0.5rem;
  }
  label {
    font-size: 1rem;
    text-transform: capitalize;
    margin-right: 1rem;
  }
`

export default Sort
