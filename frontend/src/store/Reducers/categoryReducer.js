import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

// Đổi tên các trường trong object trả về từ API theo API từ backend
export const get_categories = createAsyncThunk(
  "category/get_categories",
  async (pageData, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(
        // `/category?page=${pageData.currentPage}&limit=${pageData.perPage}`
        `/categories`
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const add_category = createAsyncThunk(
  "category/add_category",
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post("/category", info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const delete_category = createAsyncThunk(
  "category/delete_category",
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/category/${id}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const update_category = createAsyncThunk(
  "category/update_category",
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.put("/category", info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
    category: {},
    success: false,
    errorMessage: "",
    loader: false,
    total: 0,
  },
  reducers: {
    clearMessage: (state) => {
      state.successMessage = "";
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_categories.pending, (state) => {
        state.loader = true;
      })
      .addCase(get_categories.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.categories = payload.data;
        state.total = payload.total;
        state.success = true;
      })
      .addCase(get_categories.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload;
      })
      .addCase(add_category.pending, (state) => {
        state.loader = true;
      })
      .addCase(add_category.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.success = true;
        state.successMessage = payload.message;
      })
      .addCase(add_category.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload;
      })
      .addCase(delete_category.pending, (state) => {
        state.loader = true;
      })
      .addCase(delete_category.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.success = true;
        state.successMessage = payload.message;
      })
      .addCase(delete_category.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload;
      })
      .addCase(update_category.pending, (state) => {
        state.loader = true;
      })
      .addCase(update_category.fulfilled, (state, { payload }) => {
        state.loader = false;
        state.success = true;
        state.successMessage = payload.message;
      })
      .addCase(update_category.rejected, (state, { payload }) => {
        state.loader = false;
        state.errorMessage = payload;
      });
  },
});

export const { clearMessage } = categorySlice.actions;
export default categorySlice.reducer;