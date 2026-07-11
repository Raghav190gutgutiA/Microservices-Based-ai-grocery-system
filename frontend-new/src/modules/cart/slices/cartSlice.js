
import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

import {
  addToCart,
  clearCart,
  getCart,
  removeFromCart,
  updateQuantity,
} from "../api/cartApi";

export const fetchCart =
  createAsyncThunk(
    "cart/fetchCart",
    async (_, thunkAPI) => {
      try {

        return await getCart();

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response?.data ||
            error.message
        );
      }
    }
  );

export const addCartItem =
  createAsyncThunk(
    "cart/addCartItem",
    async (
      cartData,
      thunkAPI
    ) => {

      try {

        return await addToCart(
          cartData
        );

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response?.data ||
            error.message
        );
      }
    }
  );

export const removeCartItem =
  createAsyncThunk(
    "cart/removeCartItem",
    async (
      productId,
      thunkAPI
    ) => {

      try {

        return await removeFromCart({
          productId,
        });

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response?.data ||
            error.message
        );
      }
    }
  );

export const updateCartQuantity =
  createAsyncThunk(
    "cart/updateQuantity",
    async (
      data,
      thunkAPI
    ) => {

      try {

        return await updateQuantity(
          data
        );

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response?.data ||
            error.message
        );
      }
    }
  );

export const clearUserCart =
  createAsyncThunk(
    "cart/clearCart",
    async (_, thunkAPI) => {

      try {

        await clearCart();

        return [];

      } catch (error) {

        return thunkAPI.rejectWithValue(
          error.response?.data ||
            error.message
        );
      }
    }
  );

const cartSlice = createSlice({
  name: "cart",

  initialState: {
    items: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {

    builder

      .addCase(
        fetchCart.pending,
        (state) => {

          state.loading = true;
        }
      )

      .addCase(
        fetchCart.fulfilled,
        (state, action) => {

          state.loading = false;

          state.items =
            action.payload.items ||
            [];
        }
      )

      .addCase(
        fetchCart.rejected,
        (state, action) => {

          state.loading = false;

          state.error =
            action.payload;
        }
      )

      .addCase(
        addCartItem.fulfilled,
        (state, action) => {

          state.items =
            action.payload.items;
        }
      )

      .addCase(
        removeCartItem.fulfilled,
        (state, action) => {

          state.items =
            action.payload.items;
        }
      )

      .addCase(
        updateCartQuantity.fulfilled,
        (state, action) => {

          state.items =
            action.payload.items;
        }
      )

      .addCase(
        clearUserCart.fulfilled,
        (state) => {

          state.items = [];
        }
      );
  },
});

export default cartSlice.reducer;