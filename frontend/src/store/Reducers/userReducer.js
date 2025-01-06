import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_users = createAsyncThunk(
  "users/get_users",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get("/user/admin/getAllNormalUser");
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const get_admins = createAsyncThunk(
  "users/get_admins",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get("/user/superAdmin/getAllAdmin");
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const get_user = createAsyncThunk(
  "users/get_user",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get("/user/getCurrentUser");
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const update_user = createAsyncThunk(
  "users/update_user",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post("/user/updateUser", info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const lock_user = createAsyncThunk(
  "users/lock_user",
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/user/admin/deactivateUserWithId?id=${id}`,
        {
          withCredentials: true,
        }
      );
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const active_user = createAsyncThunk(
  "users/active_user",
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/user/admin/activeUserWithId?id=${id}`, {
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
    total: 0,
    success: false,
    errorMessage: "",
    loader: false,
  },
  reducers: {
    clearMessage: (state) => {
      state.success = false;
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_users.pending, (state) => {
        state.loader = true;
      })
      .addCase(get_users.fulfilled, (state, { payload }) => {
        state.users = payload.users;
        state.total = payload.total;
        state.loader = false;
      })
      .addCase(get_users.rejected, (state, { payload }) => {
        state.errorMessage = payload;
        state.loader = false;
      })
      .addCase(get_user.pending, (state) => {
        state.loader = true;
      })
      .addCase(get_user.fulfilled, (state, { payload }) => {
        state.user = payload;
        state.loader = false;
      })
      .addCase(get_user.rejected, (state, { payload }) => {
        state.errorMessage = payload;
        state.loader = false;
      })
      .addCase(update_user.pending, (state) => {
        state.loader = true;
      })
      .addCase(update_user.fulfilled, (state) => {
        state.success = true;
        state.loader = false;
      })
      .addCase(update_user.rejected, (state, { payload }) => {
        state.errorMessage = payload;
        state.loader = false;
      });
  },
});

export const { clearMessage } = usersSlice.actions;
export default usersSlice.reducer;
