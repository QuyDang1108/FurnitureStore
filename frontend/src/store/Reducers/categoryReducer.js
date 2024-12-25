import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_categories = createAsyncThunk(
  "category/get_categories",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get("/category");
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
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
      return rejectWithValue(error.response.data);
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
      return rejectWithValue(error.response.data);
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
      return rejectWithValue(error.response.data);
    }
  }
);

export const categorySlice = createSlice({
  name: "category",
  initialState: {
    categories: [],
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
    [get_categories.pending]: (state) => {
      state.loader = true;
    },
    [get_categories.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.categories = payload;
    },
    [get_categories.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload;
    },
    [add_category.pending]: (state) => {
      state.loader = true;
    },
    [add_category.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.success = true;
      state.categories.push(payload);
    },
    [add_category.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload;
    },
    [delete_category.pending]: (state) => {
      state.loader = true;
    },
    [delete_category.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.success = true;
      state.categories = state.categories.filter(
        (category) => category._id !== payload._id
      );
    },
    [delete_category.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload;
    },
    [update_category.pending]: (state) => {
      state.loader = true;
    },
    [update_category.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.success = true;
      state.categories = state.categories.map((category) =>
        category._id === payload._id ? payload : category
      );
    },
    [update_category.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload;
    },
  },
});

export const { clearMessage } = categorySlice.actions;
export default categorySlice.reducer;
