import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_total_sales = createAsyncThunk(
  "stat/get_total_sales",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get("/totalSales");
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_total_orders = createAsyncThunk(
  "stat/get_total_orders",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get("/orders/total");
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_total_users = createAsyncThunk(
  "stat/get_total_users",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get("/totalUsers");
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_total_products = createAsyncThunk(
  "stat/get_total_products",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get("/totalProducts");
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const statSlice = createSlice({
  name: "stat",
  initialState: {
    totalSales: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0,
    loader: false,
    success: false,
    errorMessage: "",
  },
  reducers: {
    clearMessage: (state) => {
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(get_total_sales.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(get_total_sales.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.totalSales = payload;
      state.success = true;
    });
    builder.addCase(get_total_sales.rejected, (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.message;
    });

    builder.addCase(get_total_orders.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(get_total_orders.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.totalOrders = payload;
      state.success = true;
    });
    builder.addCase(get_total_orders.rejected, (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.message;
    });

    builder.addCase(get_total_users.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(get_total_users.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.totalUsers = payload;
      state.success = true;
    });
    builder.addCase(get_total_users.rejected, (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.message;
    });

    builder.addCase(get_total_products.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(get_total_products.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.totalProducts = payload;
      state.success = true;
    });
    builder.addCase(get_total_products.rejected, (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.message;
    });
  },
});

export const { clearMessage } = statSlice.actions;
export default statSlice.reducer;