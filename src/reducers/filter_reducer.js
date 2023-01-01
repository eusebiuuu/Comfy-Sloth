import {
  LOAD_PRODUCTS,
  SET_LISTVIEW,
  SET_GRIDVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../actions'

const filter_reducer = (state, action) => {
  if (action.type === LOAD_PRODUCTS) {
    const prices = action.payload.map(prod => prod.price);
    const maxPrice = Math.max(...prices);
    const minPrice = Math.min(...prices);
    // console.log(state.filteredProducts);
    return {
      ...state,
      products: [...action.payload],
      filteredProducts: [...action.payload],
      filters: {
        maxPrice: maxPrice,
        minPrice: minPrice,
        price: maxPrice,
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        shipping: false,
      }
    }
  } else if (action.type === SET_GRIDVIEW) {
    return {
      ...state,
      gridView: true,
    }
  } else if (action.type === SET_LISTVIEW) {
    return {
      ...state,
      gridView: false,
    }
  } else if (action.type === UPDATE_SORT) {
    return {
      ...state,
      sortCriteria: action.payload,
    }
  } else if (action.type === SORT_PRODUCTS) {
    const { filteredProducts, sortCriteria } = state;
    const newProducts = [...filteredProducts];
    newProducts.sort((prod1, prod2) => {
      if (sortCriteria === 'price-lowest') {
        return prod1.price - prod2.price;
      } else if (sortCriteria === 'price-highest') {
        return -1 * (prod1.price - prod2.price);
      } else if (sortCriteria === 'name-az') {
        return prod1.name.localeCompare(prod2.name);
      } else {
        return prod2.name.localeCompare(prod1.name);
      }
    });
    return {
      ...state,
      filteredProducts: [...newProducts],
    }
  }
  else if (action.type === FILTER_PRODUCTS) {
    let newProducts = [...state.products];
    const { filters } = state;
    const { text, category, company, color, price, shipping } = filters;
    newProducts = newProducts.filter(product => product.name.toLowerCase().includes(text.toLowerCase()));
    newProducts = newProducts.filter(product => {
      return product.category === category || category === 'all';
    });
    newProducts = newProducts.filter(product => {
      return product.company === company || company === 'all';
    });
    newProducts = newProducts.filter(product => {
      return product.colors.includes(color) || color === 'all';
    });
    newProducts = newProducts.filter(product => {
      return product.price <= price;
    });
    newProducts = newProducts.filter(product => {
      return product.shipping || !shipping;
    })
    // console.log(newProducts);
    return {
      ...state,
      filteredProducts: [...newProducts],
    }
  } else if (action.type === UPDATE_FILTERS) {
    const { name, content } = action.payload;
    return {
      ...state,
      filters: {
        ...state.filters,
        [name]: content,
      }
    }
  } else if (action.type === CLEAR_FILTERS) {
    return {
      ...state,
      filters: {
        ...state.filters,
        text: '',
        company: 'all',
        category: 'all',
        color: 'all',
        price: state.filters.maxPrice,
        shipping: false,
      }
    }
  }
  throw new Error(`No Matching "${action.type}" - action type`)
}

export default filter_reducer;
