import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions'

const cart_reducer = (state, action) => {
  if (action.type === ADD_TO_CART) {
    const { id, color, amount, product } = action.payload;
    // console.log('Product', product);
    const existingProd = state.cart.find((prod) => prod.id === id + color);
    if (existingProd) {
      const newCart = state.cart.map(prod => {
        if (prod.id !== id + color) {
          return prod;
        } else {
          const curAmount = Math.min(prod.amount + amount, product.stock);
          return {
            ...prod,
            amount: curAmount,
          };
        }
      });
      return {
        ...state,
        cart: [...newCart],
      }
    }
    const newItem = {
      id: id + color,
      color: color,
      amount: amount,
      image: product.images[0].url,
      name: product.name,
      maxAmount: product.stock,
      price: product.price,
    }
    return {
      ...state,
      cart: [...state.cart, newItem],
    }
  } else if (action.type === TOGGLE_CART_ITEM_AMOUNT) {
    const { cart } = state;
    const { id, newAmount } = action.payload;
    console.log(id, newAmount);
    const newCart = cart.map(item => {
      if (item.id === id) {
        return {
          ...item,
          amount: newAmount,
        }
      }
      return item;
    });
    return {
      ...state,
      cart: [...newCart],
    }
  } else if (action.type === REMOVE_CART_ITEM) {
    const id = action.payload;
    const newCart = state.cart.filter(item => item.id !== id);
    return {
      ...state,
      cart: [...newCart],
    }
  } else if (action.type === COUNT_CART_TOTALS) {
    const totalItems = state.cart.reduce((sum, prod) => {
      return sum + prod.amount;
    }, 0);
    const totalCost = state.cart.reduce((cost, prod) => {
      return cost + prod.amount * prod.price;
    }, 0);
    return {
      ...state,
      itemsCount: totalItems,
      totalPrice: totalCost,
    }
  } else if (action.type === CLEAR_CART) {
    return {
      ...state,
      cart: [],
    }
  }
  throw new Error(`No Matching "${action.type}" - action type`);
}

export default cart_reducer
