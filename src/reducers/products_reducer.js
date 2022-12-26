import {
  SIDEBAR_OPEN,
  SIDEBAR_CLOSE,
  GET_PRODUCTS_BEGIN,
  GET_PRODUCTS_SUCCESS,
  GET_PRODUCTS_ERROR,
  GET_SINGLE_PRODUCT_BEGIN,
  GET_SINGLE_PRODUCT_SUCCESS,
  GET_SINGLE_PRODUCT_ERROR,
} from '../actions'

const products_reducer = (state, action) => {
  if (action.type === SIDEBAR_OPEN) {
    return {
      ...state,
      isSidebarOpen: true,
    }
  } else if (action.type === SIDEBAR_CLOSE) {
    return {
      ...state,
      isSidebarOpen: false,
    }
  } else if (action.type === GET_PRODUCTS_SUCCESS) {
    const products = action.payload;
    const featuredProducts = products.filter(product => product.featured === true);
    return {
      ...state,
      productsLoading: false,
      productsError: false,
      featuredProducts,
      products,
    }
  } else if (action.type === GET_PRODUCTS_BEGIN) {
    return {
      ...state,
      productsLoading: true,
      productsError: false,
    }
  } else if (action.type === GET_PRODUCTS_ERROR) {
    console.log({ error: action.payload });
    return {
      ...state,
      productsLoading: false,
      productsError: true,
    }
  } else if (action.type === GET_SINGLE_PRODUCT_BEGIN) {
    return {
      ...state,
      singleProductLoading: true,
      singleProductError: false,
    }
  } else if (action.type === GET_SINGLE_PRODUCT_ERROR) {
    console.log({ error: action.payload });
    return {
      ...state,
      singleProductLoading: false,
      singleProductError: true,
    }
  } else if (action.type === GET_SINGLE_PRODUCT_SUCCESS) {
    return {
      ...state,
      singleProductLoading: false,
      singleProductError: false,
      singleProduct: action.payload,
    }
  }
  throw new Error(`No Matching "${action.type}" - action type`);
}

export default products_reducer;
