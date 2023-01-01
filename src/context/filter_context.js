import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/filter_reducer'
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'
import { useProductsContext } from './products_context'

const initialState = {
  products: [],
  filteredProducts: [],
  gridView: true,
  sortCriteria: 'price-lowest',
  filters: {
    text: '',
    company: 'all',
    category: 'all',
    color: 'all',
    minPrice: 0,
    maxPrice: 0,
    price: 0,
    shipping: false,
  }
}

const FilterContext = React.createContext();

export const FilterProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { products } = useProductsContext();

  useEffect(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: products });
    dispatch({ type: SORT_PRODUCTS });
  }, [products]);

  useEffect(() => {
    dispatch({ type: FILTER_PRODUCTS });
    dispatch({ type: SORT_PRODUCTS });
  }, [state.filters]);

  useEffect(() => {
    dispatch({ type: SORT_PRODUCTS });
  }, [state.sortCriteria]);

  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  }

  const setListView = () => {
    dispatch({ type: SET_LISTVIEW });
  }

  const handleSortCriteriaChange = (event) => {
    const criteria = event.target.value;
    dispatch({ type: UPDATE_SORT, payload: criteria });
  }

  const handleFiltersChange = (event) => {
    let value = event.target.value;
    const name = event.target.name;
    if (name === 'category') {
      value = event.target.textContent;
    }
    if (name === 'color') {
      value = event.target.dataset.color;
    }
    if (name === 'price') {
      value = Number.parseInt(event.target.value, 10);
    }
    if (name === 'shipping') {
      value = event.target.checked;
    }
    console.log(value, name);
    dispatch({ type: UPDATE_FILTERS, payload: {
      name: name,
      content: value,
    } });
  }

  const handleFiltersClear = () => {
    dispatch({ type: CLEAR_FILTERS });
  }

  const value = {
    ...state,
    setGridView,
    setListView,
    onSortCriteriaChange: handleSortCriteriaChange,
    onFiltersChange: handleFiltersChange,
    onFiltersClear: handleFiltersClear,
  }

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  )
}

export const useFilterContext = () => {
  return useContext(FilterContext);
}
