import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getAllProducts = createAsyncThunk('products/getAllProducts', async (url, thunkAPI) => {
  // console.log(thunkAPI.getState());
  // thunkAPI.getState().products.isSidebarOpen = true;
  // thunkAPI.dispatch(handleSidebarOpen());
  return fetch(url)
  .then((response) => response.json())
  .catch(error => {
    return thunkAPI.rejectWithValue(error);
  });
});

export const getSingleProduct = createAsyncThunk('products/getSingleProduct', async (url) => {
  return fetch(url)
  .then((response) => response.json())
  .catch(error => console.log(error));
});

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    isSidebarOpen: false,
    productsLoading: false,
    productsError: false,
    products: [],
    featuredProducts: [],
    singleProductLoading: false,
    singleProductError: false,
    singleProduct: {},
  },
  reducers: {
    handleSidebarOpen: (state) => {
      state.isSidebarOpen = true;
    },
    handleSidebarClose: (state) => {
      state.isSidebarOpen = false;
    },
  },
  extraReducers: (builder => {
    builder
    .addCase(getAllProducts.pending, (state) => {
      state.productsLoading = true;
      state.productsError = false;
    })
    .addCase(getAllProducts.fulfilled, (state, action) => {
      const products = action.payload;
      state.products = products;
      state.featuredProducts = products.filter(prod => prod.featured === true);
      state.productsLoading = false;
      state.productsError = false;
    })
    .addCase(getAllProducts.rejected, (state) => {
      state.productsLoading = false;
      state.productsError = true;
    })
    .addCase(getSingleProduct.pending, (state) => {
      state.singleProductLoading = true;
      state.singleProductError = false;
    })
    .addCase(getSingleProduct.fulfilled, (state, action) => {
      state.singleProductLoading = false;
      state.singleProductError = false;
      state.singleProduct = action.payload;
    })
    .addCase(getSingleProduct.rejected, (state) => {
      state.singleProductLoading = false;
      state.singleProductError = true;
    });
  }),
});

export const {
  handleSidebarClose,
  handleSidebarOpen,
} = productsSlice.actions;

export default productsSlice.reducer;