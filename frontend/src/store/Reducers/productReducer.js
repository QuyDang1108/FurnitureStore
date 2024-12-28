import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_products = createAsyncThunk(
  "products/get_products",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get("/products");
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.message);
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
      return rejectWithValue(error.message);
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
      return rejectWithValue(error.message);
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
      return rejectWithValue(error.message);
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
      return rejectWithValue(error.message);
    }
  }
);

export const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    product: {},
    total: 0,
    success: false,
    errorMessage: "",
    loader: false,
  },
  reducers: {
    clearMessage: (state) => {
      state.errorMessage = "";
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_products.pending, (state) => {
        state.loader = true;
      })
      .addCase(get_products.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.products = payload.products;
        state.total = payload.total;
        state.success = true;
      })
      .addCase(get_products.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.message;
      })
      .addCase(get_product.pending, (state) => {
        state.loader = true;
      })
      .addCase(get_product.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.product = payload;
        state.success = true;
      })
      .addCase(get_product.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.message;
      })
      .addCase(add_product.pending, (state) => {
        state.loader = true;
      })
      .addCase(add_product.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.success = true;
      })
      .addCase(add_product.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.message;
      })
      .addCase(update_product.pending, (state) => {
        state.loader = true;
      })
      .addCase(update_product.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.success = true;
      })
      .addCase(update_product.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.message;
      })
      .addCase(delete_product.pending, (state) => {
        state.loader = true;
      })
      .addCase(delete_product.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.success = true;
      })
      .addCase(delete_product.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload.message;
      });
  },
});

export const { clearMessage } = productSlice.actions;
export default productSlice.reducer;
