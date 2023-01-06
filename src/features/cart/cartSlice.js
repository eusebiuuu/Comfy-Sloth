import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: JSON.parse(localStorage.getItem('cart')) ?? [],
  itemsCount: 0,
  totalPrice: 0,
  shippingFee: 529,
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    handleCartClear: (state) => {
      state.cart = [];
    },
    handleCartAddition: (state, action) => {
      console.log(action.payload);
      const { id, color, amount, product } = action.payload;
      console.log(id, color, amount, product);
      const newItem = {
        id: id + color,
        color: color,
        amount: amount,
        image: product.images[0].url,
        name: product.name,
        maxAmount: product.stock,
        price: product.price,
      }
      const newCart = state.cart.filter(cartItem => {
        if (newItem.id === cartItem.id) {
          newItem.amount = Math.min(cartItem.amount + newItem.amount, newItem.stock);
        }
        return cartItem;
      });
      console.log(newCart);
      newCart.push(newItem);
      state.cart = newCart;
    },
    handleCartAmountToggle: (state, action) => {
      const { id, amount } = action.payload;
      console.log(id, amount);
      const newCart = state.cart.map(item => {
        if (item.id === id) {
          return {
            ...item,
            amount: amount,
          }
        }
        return item;
      });
      state.cart = newCart;
    },
    handleCartItemRemove: (state, action) => {
      const id = action.payload;
      const newCart = state.cart.filter(item => item.id !== id);
      state.cart = newCart;
    },
    handleTotalsCount: (state, action) => {
      const { totalItems, totalCost } = state.cart.reduce((total, prod) => {
        return {
          totalItems: total.totalItems + prod.amount,
          totalCost: total.totalCost + prod.amount * prod.price,
        }
      }, {
        totalItems: 0,
        totalCost: 0,
      });
      state.itemsCount = totalItems;
      state.totalPrice = totalCost;
    }
  },
});
console.log(cartSlice);

export const {
  handleCartClear,
  handleCartAddition,
  handleCartAmountToggle,
  handleCartItemRemove,
  handleTotalsCount
} = cartSlice.actions;

export default cartSlice.reducer;