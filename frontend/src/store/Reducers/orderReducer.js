import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_orders = createAsyncThunk(
  "orders/get_orders",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get("/orders");
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
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
      return rejectWithValue(error.response.data);
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
      return rejectWithValue(error.response.data);
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
      return rejectWithValue(error.response.data);
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
      return rejectWithValue(error.response.data);
    }
  }
);

const orderSlice = createSlice({
  name: "orders",
  initialState: {
    orders: [],
    order: {},
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
  extraReducers: {
    [get_orders.pending]: (state) => {
      state.loader = true;
    },
    [get_orders.fulfilled]: (state, { payload }) => {
      state.orders = payload;
      state.loader = false;
    },
    [get_orders.rejected]: (state, { payload }) => {
      state.errorMessage = payload ? payload.message : "Failed to get orders";
      state.loader = false;
    },
    [get_order.pending]: (state) => {
      state.loader = true;
    },
    [get_order.fulfilled]: (state, { payload }) => {
      state.order = payload;
      state.loader = false;
    },
    [get_order.rejected]: (state, { payload }) => {
      state.errorMessage = payload ? payload.message : "Failed to get order";
      state.loader = false;
    },
    [add_order.pending]: (state) => {
      state.loader = true;
    },
    [add_order.fulfilled]: (state, { payload }) => {
      state.success = true;
      state.successMessage = payload.message;
      state.loader = false;
    },
    [add_order.rejected]: (state, { payload }) => {
      state.errorMessage = payload ? payload.message : "Failed to add order";
      state.loader = false;
    },
    [update_order.pending]: (state) => {
      state.loader = true;
    },
    [update_order.fulfilled]: (state, { payload }) => {
      state.success = true;
      state.successMessage = payload.message;
      state.loader = false;
    },
    [update_order.rejected]: (state, { payload }) => {
      state.errorMessage = payload ? payload.message : "Failed to update order";
      state.loader = false;
    },
    [delete_order.pending]: (state) => {
      state.loader = true;
    },
    [delete_order.fulfilled]: (state, { payload }) => {
      state.success = true;
      state.successMessage = payload.message;
      state.loader = false;
    },
    [delete_order.rejected]: (state, { payload }) => {
      state.errorMessage = payload ? payload.message : "Failed to delete order";
      state.loader = false;
    },
  },
});

export const { clearMessage } = orderSlice.actions;
export default orderSlice.reducer;
