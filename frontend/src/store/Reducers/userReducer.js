import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_users = createAsyncThunk(
  "users/get_users",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get("/users");
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_user = createAsyncThunk(
  "users/get_user",
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/users/${id}`);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const update_user = createAsyncThunk(
  "users/update_user",
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.put("/users", info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const delete_user = createAsyncThunk(
  "users/delete_user",
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/users/${id}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState: {
    users: [],
    user: {},
    success: false,
    errorMessage: "",
  },
  reducers: {
    clearMessage: (state) => {
      state.success = false;
      state.errorMessage = "";
    },
  },
  extraReducers: {
    [get_users.fulfilled]: (state, action) => {
      state.users = action.payload;
    },
    [get_users.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },
    [get_user.fulfilled]: (state, action) => {
      state.user = action.payload;
    },
    [get_user.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },
    [update_user.fulfilled]: (state, action) => {
      state.success = true;
    },
    [update_user.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },
    [delete_user.fulfilled]: (state, action) => {
      state.success = true;
    },
    [delete_user.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export const { clearMessage } = usersSlice.actions;
export default usersSlice.reducer;
