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
  extraReducers: (builder) => {
    builder
      .addCase(get_products.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(get_product.fulfilled, (state, action) => {
        state.product = action.payload;
      })
      .addCase(add_product.pending, (state) => {
        state.loader = true;
      })
      .addCase(add_product.fulfilled, (state) => {
        state.loader = false;
        state.success = true;
      })
      .addCase(add_product.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.message;
      })
      .addCase(update_product.pending, (state) => {
        state.loader = true;
      })
      .addCase(update_product.fulfilled, (state) => {
        state.loader = false;
        state.success = true;
      })
      .addCase(update_product.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.message;
      })
      .addCase(delete_product.pending, (state) => {
        state.loader = true;
      })
      .addCase(delete_product.fulfilled, (state) => {
        state.loader = false;
        state.success = true;
      })
      .addCase(delete_product.rejected, (state, action) => {
        state.loader = false;
        state.errorMessage = action.payload.message;
      });
  },
});

export const { clearMessage } = productSlice.actions;
export default productSlice.reducer;
