import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_cart = createAsyncThunk(
  "cart/get_cart",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get("/cart/cartOfCurrentUser");
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const add_to_cart = createAsyncThunk(
  "cart/add_to_cart",
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/cart/addToCart?productId=${info.id}&amount=${info.quantity}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const update_cart = createAsyncThunk(
  "cart/update_cart",
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/cart/updateCartDetail?productId=${info.id}&amount=${info.quantity}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const delete_from_cart = createAsyncThunk(
  "cart/delete_from_cart",
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/cart/deleteCartDetail?productId=${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
    success: false,
    errorMessage: "",
    loader: false,
  },
  reducers: {
    clearMessage: (state) => {
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_cart.pending, (state) => {
        state.loader = true;
      })
      .addCase(get_cart.fulfilled, (state, action) => {
        state.loader = false;
        state.cart = action.payload;
      })
      .addCase(get_cart.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.message;
      })
      .addCase(add_to_cart.pending, (state) => {
        state.loader = true;
      })
      .addCase(add_to_cart.fulfilled, (state, action) => {
        state.loader = false;
        state.success = true;
      })
      .addCase(add_to_cart.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.message;
      })
      .addCase(update_cart.pending, (state) => {
        state.loader = true;
      })
      .addCase(update_cart.fulfilled, (state, action) => {
        state.loader = false;
        state.success = true;
      })
      .addCase(update_cart.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.message;
      })
      .addCase(delete_from_cart.pending, (state) => {
        state.loader = true;
      })
      .addCase(delete_from_cart.fulfilled, (state, action) => {
        state.loader = false;
        state.success = true;
      })
      .addCase(delete_from_cart.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.message;
      });
  },
});

export const { clearMessage } = cartSlice.actions;
export default cartSlice.reducer;
