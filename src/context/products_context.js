import axios from 'axios'
import React, { useContext, useEffect, useReducer } from 'react'
import reducer from '../reducers/products_reducer'
import { products_url as url } from '../utils/constants'
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

const initialState = {
  isSidebarOpen: false,
  productsLoading: false,
  productsError: false,
  products: [],
  featuredProducts: [],
  singleProductLoading: false,
  singleProductError: false,
  singleProduct: {},
}

const ProductsContext = React.createContext();

const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const openSidebar = () => {
    dispatch({ type: SIDEBAR_OPEN });
  }

  const closeSidebar = () => {
    dispatch({ type: SIDEBAR_CLOSE });
  }

  const getAllProducts = async () => {
    dispatch({ type: GET_PRODUCTS_BEGIN });
    try {
      const response = await axios.get(url);
      const products = response.data;
      dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
    } catch (error) {
      dispatch({ type: GET_PRODUCTS_ERROR, payload: error });
    }
  }

  const getSingleProduct = async (url) => {
    dispatch({ type: GET_SINGLE_PRODUCT_BEGIN });
    try {
      const response = await axios.get(url);
      const product = response.data;
      console.log(product);
      dispatch({ type: GET_SINGLE_PRODUCT_SUCCESS, payload: product });
    } catch (error) {
      console.log(error);
      dispatch({ type: GET_SINGLE_PRODUCT_ERROR, payload: error });
    }
  }

  useEffect(() => {
    (async () => {
      await getAllProducts();
    })();
  }, []);

  const value = {
    ...state,
    openSidebar,
    closeSidebar,
    getSingleProduct,
  }

  return (<ProductsContext.Provider value={value}>
    {children}
  </ProductsContext.Provider>);
}

const useProductsContext = () => {
  return useContext(ProductsContext);
}

export { useProductsContext, ProductsProvider };
