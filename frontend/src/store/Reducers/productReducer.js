import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_products = createAsyncThunk(
  "products/get_products",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get("/products");
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_product = createAsyncThunk(
  "products/get_product",
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/products/${id}`);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const add_product = createAsyncThunk(
  "products/add_product",
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post("/products", info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const update_product = createAsyncThunk(
  "products/update_product",
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.put(`/products/${info.id}`, info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const delete_product = createAsyncThunk(
  "products/delete_product",
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/products/${id}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    product: {},
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
    [get_products.pending]: (state) => {
      state.loader = true;
    },
    [get_products.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.products = payload;
    },
    [get_products.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.message;
    },
    [get_product.pending]: (state) => {
      state.loader = true;
    },
    [get_product.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.product = payload;
    },
    [get_product.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.message;
    },
    [add_product.pending]: (state) => {
      state.loader = true;
    },
    [add_product.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.success = true;
      state.products.push(payload);
    },
    [add_product.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.message;
    },
    [update_product.pending]: (state) => {
      state.loader = true;
    },
    [update_product.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.success = true;
      state.products = state.products.map((product) =>
        product._id === payload._id ? payload : product
      );
    },
    [update_product.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.message;
    },
    [delete_product.pending]: (state) => {
      state.loader = true;
    },
    [delete_product.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.success = true;
      state.products = state.products.filter(
        (product) => product._id !== payload._id
      );
    },
    [delete_product.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.message;
    },
  },
});

export const { clearMessage } = productSlice.actions;
export default productSlice.reducer;
