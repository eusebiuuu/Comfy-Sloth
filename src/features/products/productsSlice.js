import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Airtable from "airtable-node";

const airtable = new Airtable({ apiKey: process.env.REACT_APP_AIRTABLE_API_KEY })
  .base(process.env.REACT_APP_AIRTABLE_BASE)
  .table(process.env.REACT_APP_AIRTABLE_TABLE);

export const getAllProducts = createAsyncThunk('products/getAllProducts', async (thunkAPI) => {
  // console.log(thunkAPI.getState());
  // thunkAPI.getState().products.isSidebarOpen = true;
  // thunkAPI.dispatch(handleSidebarOpen());
  try {
    const response = await airtable.list({ maxRecords: 200 });
    return response.records.map((product) => {
      const { id, fields } = product;
      const {
        name,
        featured,
        price,
        colors,
        company,
        description,
        category,
        shipping,
        images,
      } = fields;
      const { url } = images[0];
      return {
        id,
        name,
        featured,
        price,
        colors,
        company,
        description,
        category,
        shipping,
        image: url,
      };
    });
  } catch (err) {
    console.log(err);
  }
});

export const getSingleProduct = createAsyncThunk('products/getSingleProduct', async (id, thunkAPI) => {
  try {
    let product = await airtable.retrieve(id);
    if (product.error) {
      throw new Error('Unable to retrieve the requested product');
    }
    product = { id: product.id, ...product.fields };
    return product;
  } catch (error) {
    console.log(error);
  }
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