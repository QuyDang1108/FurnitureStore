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
      console.log(error);
      return rejectWithValue(error);
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
      return rejectWithValue(error);
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
      return rejectWithValue(error);
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
      return rejectWithValue(error);
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
  extraReducers: (builder) => {
    builder.addCase(admin_login.fulfilled, (state, { payload }) => {
      state.successMessage = payload.message;
      state.userInfo = payload.user;
    });
    builder.addCase(admin_login.rejected, (state, { payload }) => {
      state.errorMessage = payload.message;
    });

    builder.addCase(user_login.fulfilled, (state, { payload }) => {
      state.successMessage = payload.message;
      state.userInfo = payload.user;
    });
    builder.addCase(user_login.rejected, (state, { payload }) => {
      state.errorMessage = payload.message;
    });

    builder.addCase(user_register.fulfilled, (state, { payload }) => {
      state.successMessage = payload.message;
    });
    builder.addCase(user_register.rejected, (state, { payload }) => {
      state.errorMessage = payload.message;
    });

    builder.addCase(user_forgot_password.fulfilled, (state, { payload }) => {
      state.successMessage = payload.message;
    });
    builder.addCase(user_forgot_password.rejected, (state, { payload }) => {
      state.errorMessage = payload.message;
    });
  },
});

export const { messageClear } = authReducer.actions;
export default authReducer.reducer;
