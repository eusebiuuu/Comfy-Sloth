import React, { useEffect, useContext, useReducer } from 'react'
import reducer from '../reducers/cart_reducer'
import {
  ADD_TO_CART,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
  CLEAR_CART,
  COUNT_CART_TOTALS,
} from '../actions'

const initialState = {
  cart: JSON.parse(localStorage.getItem('cart')) ?? [],
  itemsCount: 0,
  totalPrice: 0,
  shippingFee: 529,
}

const CartContext = React.createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleCartAddition = ({ id, color, amount, product }) => {
    console.log(color, amount, product);
    dispatch({ type: ADD_TO_CART, payload: { id, color, amount, product } });
  }

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(state.cart));
    dispatch({ type: COUNT_CART_TOTALS });
  }, [state.cart]);

  const handleCartClear = () => {
    dispatch( {type: CLEAR_CART });
  }

  const handleCartAmountToggle = (id, newAmount) => {
    dispatch({ type: TOGGLE_CART_ITEM_AMOUNT, payload: { id, newAmount } });
  }

  const handleCartItemRemove = (id) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id });
  }

  useEffect(() => {

  })
  const handleCartTotalCount = () => {
  }

  const value = {
    ...state,
    onCartAddition: handleCartAddition,
    onCartClear: handleCartClear,
    onCartAmountToggle: handleCartAmountToggle,
    onCartItemRemove: handleCartItemRemove,
    onCartTotalCount: handleCartTotalCount,
  }
  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => {
  return useContext(CartContext);
}
