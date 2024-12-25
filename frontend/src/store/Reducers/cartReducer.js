import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_cart = createAsyncThunk(
  "cart/get_cart",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get("/cart");
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
      const { data } = await api.post("/cart", info, {
        withCredentials: true,
      });
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
      const { data } = await api.put("/cart", info, {
        withCredentials: true,
      });
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
      const { data } = await api.delete(`/cart/${id}`, {
        withCredentials: true,
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
  extraReducers: {
    [get_cart.pending]: (state) => {
      state.loader = true;
    },
    [get_cart.fulfilled]: (state, action) => {
      state.loader = false;
      state.cart = action.payload;
    },
    [get_cart.rejected]: (state, action) => {
      state.loader = false;
      state.errorMessage = action.payload.message;
    },
    [add_to_cart.pending]: (state) => {
      state.loader = true;
    },
    [add_to_cart.fulfilled]: (state, action) => {
      state.loader = false;
      state.success = true;
      state.cart = action.payload;
    },
    [add_to_cart.rejected]: (state, action) => {
      state.loader = false;
      state.errorMessage = action.payload.message;
    },
    [update_cart.pending]: (state) => {
      state.loader = true;
    },
    [update_cart.fulfilled]: (state, action) => {
      state.loader = false;
      state.success = true;
      state.cart = action.payload;
    },
    [update_cart.rejected]: (state, action) => {
      state.loader = false;
      state.errorMessage = action.payload.message;
    },
    [delete_from_cart.pending]: (state) => {
      state.loader = true;
    },
    [delete_from_cart.fulfilled]: (state, action) => {
      state.loader = false;
      state.success = true;
      state.cart = action.payload;
    },
    [delete_from_cart.rejected]: (state, action) => {
      state.loader = false;
      state.errorMessage = action.payload.message;
    },
  },
});

export const { clearMessage } = cartSlice.actions;
export default cartSlice.reducer;
