import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_total_sales = createAsyncThunk(
  "stat/get_total_sales",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get("/totalSales");
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const get_total_orders = createAsyncThunk(
  "stat/get_total_orders",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get("/totalOrders");
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.message);
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
      return rejectWithValue(error.message);
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
      return rejectWithValue(error.message);
    }
  }
);

export const get_revennue_stats = createAsyncThunk(
  "stat/get_revennue_stats",
  async (option, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get("/revenueStats");
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.message);
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
    chart: { labels: [], data: [] },
    table: [],
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
      state.errorMessage = payload;
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
      state.errorMessage = payload;
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
      state.errorMessage = payload;
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
      state.errorMessage = payload;
    });
    builder.addCase(get_revennue_stats.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(get_revennue_stats.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.success = true;
      state.totalUsers = payload.totalUsers;
      state.totalOrders = payload.totalOrders;
      state.totalSales = payload.totalSales;
      state.totalProducts = payload.totalProducts;
      state.chart = payload.chartData;
      state.table = payload.tableData;
    });
    builder.addCase(get_revennue_stats.rejected, (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload;
    });
  },
});

export const { clearMessage } = statSlice.actions;
export default statSlice.reducer;
