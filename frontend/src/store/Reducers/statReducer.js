import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../../api/api";

export const get_revennue_stats = createAsyncThunk(
  "stat/get_revennue_stats",
  async (option, { fulfillWithValue, rejectWithValue }) => {
    try {
      console.log(option);
      const data = {
        totalUsers: 100,
        totalOrders: 1000,
        totalSales: 33000000,
        totalProducts: 1000,
        chartData: {
          labels: [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ],
          data: [100, 600, 300, 100, 500, 300, 700, 200, 500, 1000, 1100, 1200],
        },
        tableData: [
          {
            period: "2024-01-01",
            totalRevenue: 5000,
            orders: 50,
            growth: "10%",
          },
          {
            period: "2024-01-02",
            totalRevenue: 6000,
            orders: 60,
            growth: "20%",
          },
          {
            period: "2024-01-03",
            totalRevenue: 4000,
            orders: 40,
            growth: "-5%",
          },
          {
            period: "2024-01-04",
            totalRevenue: 7000,
            orders: 70,
            growth: "15%",
          },
          {
            period: "2024-01-05",
            totalRevenue: 8000,
            orders: 80,
            growth: "25%",
          },
          {
            period: "2024-01-06",
            totalRevenue: 9000,
            orders: 90,
            growth: "30%",
          },
          {
            period: "2024-01-07",
            totalRevenue: 10000,
            orders: 100,
            growth: "35%",
          },
          {
            period: "2024-01-08",
            totalRevenue: 11000,
            orders: 110,
            growth: "40%",
          },
          {
            period: "2024-01-09",
            totalRevenue: 12000,
            orders: 120,
            growth: "45%",
          },
          {
            period: "2024-01-10",
            totalRevenue: 13000,
            orders: 130,
            growth: "50%",
          },
        ],
      };
      // const { data } = await api.get("/revenueStats", {
      //   headers: {
      //     Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      //   },
      // });
      // console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_category_revenue = createAsyncThunk(
  "stat/get_category_revenue",
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/superadmin/revenueOfCategory?startDate=${info.startDate}&endDate=${info.endDate}&categoryId=${info.id}`
      );
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_product_revenue = createAsyncThunk(
  "stat/get_product_revenue",
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/superadmin/revenueOfProduct?startDate=${info.startDate}&endDate=${info.endDate}&productId=${info.id}`
      );
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_store_revenue = createAsyncThunk(
  "stat/get_store_revenue",
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/superadmin/revenueOfStore?startDate=${info.startDate}&endDate=${info.endDate}`
      );
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_categories_revenue = createAsyncThunk(
  "stat/get_categories_revenue",
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/superadmin/revenueStatisticsForAllCategories?startDate=${info.startDate}&endDate=${info.endDate}`
      );
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const get_products_revenue = createAsyncThunk(
  "stat/get_products_revenue",
  async (info, { fulfillWithValue, rejectWithValue }) => {
    try {
      const { data } = await api.get(
        `/superadmin/revenueStatisticsForAllProducts?startDate=${info.startDate}&endDate=${info.endDate}`
      );
      console.log(data);
      return fulfillWithValue(data);
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const statSlice = createSlice({
  name: "stat",
  initialState: {
    totalSales: 0,
    totalOrders: 0,
    totalUsers: 0,
    totalProducts: 0,
    chart: { labels: [], data: [] },
    table: [],
    loader: false,
    success: false,
    errorMessage: "",
  },
  reducers: {
    clearMessage: (state) => {
      state.errorMessage = "";
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(get_revennue_stats.pending, (state) => {
      state.loader = true;
    });
    builder.addCase(get_revennue_stats.fulfilled, (state, { payload }) => {
      state.loader = false;
      state.success = true;
      state.totalUsers = payload.totalUsers;
      state.totalOrders = payload.totalOrders;
      state.totalSales = payload.totalSales;
      state.totalProducts = payload.totalProducts;
      state.chart = payload.chartData;
      state.table = payload.tableData;
    });
    builder.addCase(get_revennue_stats.rejected, (state, { payload }) => {
      state.loader = false;
      state.errorMessage = payload;
    });
  },
});

export const { clearMessage } = statSlice.actions;
export default statSlice.reducer;
