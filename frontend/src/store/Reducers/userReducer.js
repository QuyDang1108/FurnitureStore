import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_users = createAsyncThunk(
  "users/get_users",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get("/users");
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.message);
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
      return rejectWithValue(error.message);
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
      return rejectWithValue(error.message);
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
      return rejectWithValue(error.message);
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
  extraReducers: (builder) => {
    builder
      .addCase(get_users.fulfilled, (state, { payload }) => {
        state.users = payload;
        state.success = true;
      })
      .addCase(get_users.rejected, (state, { payload }) => {
        state.errorMessage = payload;
      })
      .addCase(get_user.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.success = true;
      })
      .addCase(get_user.rejected, (state, { payload }) => {
        state.errorMessage = payload;
      })
      .addCase(update_user.fulfilled, (state, { payload }) => {
        state.success = true;
      })
      .addCase(update_user.rejected, (state, { payload }) => {
        state.errorMessage = payload;
      })
      .addCase(delete_user.fulfilled, (state, { payload }) => {
        state.success = true;
      })
      .addCase(delete_user.rejected, (state, { payload }) => {
        state.errorMessage = payload;
      });
  },
});

export const { clearMessage } = usersSlice.actions;
export default usersSlice.reducer;
