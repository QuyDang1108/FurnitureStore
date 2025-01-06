import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";
import { jwtDecode } from "jwt-decode";

export const admin_login = createAsyncThunk(
  "auth/admin_login",
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post("/admin-login", info, {
        withCredentials: true,
      });
      localStorage.setItem("accessToken", data.token);
      return fulfillWithValue(data);
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  }
);

export const get_user_info = createAsyncThunk(
  "auth/get_user_info",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get("/user-info", {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
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

export const log_out = createAsyncThunk(
  "auth/log_out",
  async ({ navigate, role }, { rejectWithValue, fulfillWithValue }) => {
    try {
      const { data } = await api.post("/logout", { withCredentials: true });
      localStorage.removeItem("accessToken");

      if (role === "admin") {
        navigate("/admin/login");
      } else {
        navigate("/login");
      }
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const get_role = (token) => {
  if (token) {
    const decodedToken = jwtDecode(token);
    const expirateTime = new Date(decodedToken.exp * 1000);
    if (expirateTime < new Date()) {
      localStorage.removeItem("accessToken");
      return "";
    } else {
      return decodedToken.role;
    }
  } else {
    return "";
  }
};

export const authReducer = createSlice({
  name: "auth",
  initialState: {
    successMessage: "",
    errorMessage: "",
    loader: false,
    userInfo: "",
    isLogged: false,
    role: get_role(localStorage.getItem("accessToken")),
  },
  reducers: {
    messageClear: (state, _) => {
      state.errorMessage = "";
      state.successMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(admin_login.pending, (state, _) => {
      state.loader = true;
    });
    builder.addCase(admin_login.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
      state.userInfo = payload.user;
      state.isLogged = true;
    });
    builder.addCase(admin_login.rejected, (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.message;
    });

    builder.addCase(user_login.pending, (state, _) => {
      state.loader = true;
    });
    builder.addCase(user_login.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
      state.userInfo = payload.user;
      state.isLogged = true;
    });
    builder.addCase(user_login.rejected, (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.message;
    });

    builder.addCase(user_register.pending, (state, _) => {
      state.loader = true;
    });
    builder.addCase(user_register.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
    });
    builder.addCase(user_register.rejected, (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.message;
    });

    builder.addCase(user_forgot_password.pending, (state, _) => {
      state.loader = true;
    });
    builder.addCase(user_forgot_password.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.successMessage = payload.message;
    });
    builder.addCase(user_forgot_password.rejected, (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.message;
    });
    builder.addCase(log_out.pending, (state, _) => {
      state.loader = true;
    });
    builder.addCase(log_out.fulfilled, (state, _) => {
      state.loader = false;
      state.isLogged = false;
      state.userInfo = "";
    });
    builder.addCase(log_out.rejected, (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload.message;
    });
  },
});

export const { messageClear } = authReducer.actions;
export default authReducer.reducer;
export const { getRole } = get_role;
