import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

const get_reviews = createAsyncThunk(
  "reviews/get_reviews",
  async (_, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get("/reviews");
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const get_review = createAsyncThunk(
  "reviews/get_review",
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(`/reviews/${id}`);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const add_review = createAsyncThunk(
  "reviews/add_review",
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.post("/reviews", info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const update_review = createAsyncThunk(
  "reviews/update_review",
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.put("/reviews", info, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const delete_review = createAsyncThunk(
  "reviews/delete_review",
  async (id, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.delete(`/reviews/${id}`, {
        withCredentials: true,
      });
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const reviewsSlice = createSlice({
  name: "reviews",
  initialState: {
    reviews: [],
    review: {},
    success: false,
    errorMessage: "",
  },
  reducers: {
    clearMessage: (state) => {
      state.errorMessage = "";
    },
  },
  extraReducers: {
    [get_reviews.fulfilled]: (state, action) => {
      state.reviews = action.payload;
    },
    [get_reviews.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },
    [get_review.fulfilled]: (state, action) => {
      state.review = action.payload;
    },
    [get_review.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },
    [add_review.fulfilled]: (state, action) => {
      state.success = true;
    },
    [add_review.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },
    [update_review.fulfilled]: (state, action) => {
      state.success = true;
    },
    [update_review.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },
    [delete_review.fulfilled]: (state, action) => {
      state.success = true;
    },
    [delete_review.rejected]: (state, action) => {
      state.errorMessage = action.payload;
    },
  },
});

export const { clearMessage } = reviewsSlice.actions;
export default reviewsSlice.reducer;
