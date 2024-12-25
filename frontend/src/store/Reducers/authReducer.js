import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const admin_login = createAsyncThunk(
  "auth/admin_login",
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post("/admin-login", info, {
        withCredentials: true,
      });
      localStorage.setItem("accessToken", data.token);
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      // console.log(error.response.data);
      return rejectWithValue(error.response.data);
    }
  }
);

export const user_login = createAsyncThunk(
  "auth/user_login",
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post("/user-login", info, {
        withCredentials: true,
      });
      localStorage.setItem("accessToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const user_register = createAsyncThunk(
  "auth/user_register",
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post("/user-register", info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const user_forgot_password = createAsyncThunk(
  "auth/user_forgot_password",
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post("/forgot-password", info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const authReducer = createSlice({
  name: "auth",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    userInfo: "",
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: {
    [admin_login.pending]: (state, _) => {
      state.loader = true;
    },
    [admin_login.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.userInfo = payload;
    },
    [admin_login.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload;
    },
    [user_login.pending]: (state, _) => {
      state.loader = true;
    },
    [user_login.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.userInfo = payload;
    },
    [user_login.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload;
    },
    [user_register.pending]: (state, _) => {
      state.loader = true;
    },
    [user_register.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload;
    },
    [user_register.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload;
    },
    [user_forgot_password.pending]: (state, _) => {
      state.loader = true;
    },
    [user_forgot_password.fulfilled]: (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload;
    },
    [user_forgot_password.rejected]: (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload;
    },
  },
});

export const { messageClear } = authReducer.actions;
export default authReducer.reducer;
