import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
// Đổi tên các trường trong object trả về từ API theo API từ backend

export const get_orders = createAsyncThunk(
  "orders/get_orders",
  async (pageData, { fulfillWithValue, rejectWithValue }) => {
    console.log(pageData);
    try {
      const { data } = await api.get(
        // `/orders?page=${pageData.currentPage}&limit=${pageData.perPage}`
        `/orders`
      );
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const get_order = createAsyncThunk(
  "orders/get_order",
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/orders/${id}`);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const add_order = createAsyncThunk(
  "orders/add_order",
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post("/orders", info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const update_order = createAsyncThunk(
  "orders/update_order",
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.put(`/orders/${info.id}`, info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const delete_order = createAsyncThunk(
  "orders/delete_order",
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/orders/${id}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const get_recent_orders = createAsyncThunk(
  "orders/get_recent_orders",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get("/recentOrders");
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    total: 0,
    order: {},
    recentOrders: [],
    success: false,
    errorMessage: "",
    loader: false,
  },
  reducers: {
    clearMessage: (state) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_orders.pending, (state) => {
        state.loader = true;
      })
      .addCase(get_orders.fulfilled, (state, { payload }) => {
        state.orders = payload.orders;
        state.total = payload.total;
        state.loader = false;
      })
      .addCase(get_orders.rejected, (state, { payload }) => {
        state.errorMessage = payload;
        state.loader = false;
      })
      .addCase(get_order.pending, (state) => {
        state.loader = true;
      })
      .addCase(get_order.fulfilled, (state, { payload }) => {
        state.order = payload;
        state.loader = false;
      })
      .addCase(get_order.rejected, (state, { payload }) => {
        state.errorMessage = payload;
        state.loader = false;
      })
      .addCase(add_order.pending, (state) => {
        state.loader = true;
      })
      .addCase(add_order.fulfilled, (state, { payload }) => {
        state.success = true;
        state.successMessage = payload.message;
        state.loader = false;
      })
      .addCase(add_order.rejected, (state, { payload }) => {
        state.errorMessage = payload;
        state.loader = false;
      })
      .addCase(update_order.pending, (state) => {
        state.loader = true;
      })
      .addCase(update_order.fulfilled, (state, { payload }) => {
        state.success = true;
        state.successMessage = payload.message;
        state.loader = false;
      })
      .addCase(update_order.rejected, (state, { payload }) => {
        state.errorMessage = payload;
        state.loader = false;
      })
      .addCase(delete_order.pending, (state) => {
        state.loader = true;
      })
      .addCase(delete_order.fulfilled, (state, { payload }) => {
        state.success = true;
        state.successMessage = payload.message;
        state.loader = false;
      })
      .addCase(delete_order.rejected, (state, { payload }) => {
        state.errorMessage = payload;
        state.loader = false;
      })
      .addCase(get_recent_orders.pending, (state) => {
        state.loader = true;
      })
      .addCase(get_recent_orders.fulfilled, (state, { payload }) => {
        state.recentOrders = payload;
        state.loader = false;
      })
      .addCase(get_recent_orders.rejected, (state, { payload }) => {
        state.errorMessage = payload;
        state.loader = false;
      });
  },
});

export const { clearMessage } = orderSlice.actions;
export default orderSlice.reducer;