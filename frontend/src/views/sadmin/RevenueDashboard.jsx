import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Line, Bar } from "react-chartjs-2";
import { DatePicker, Space, Select, Button, Table } from "antd";
import "antd/dist/reset.css";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";
import { get_revennue_stats } from "./../../store/Reducers/statReducer";
import { toast } from "react-hot-toast";
import dayjs from "dayjs";

const RevenueDashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [timeFilter, setTimeFilter] = useState(
    searchParams.get("timeFilter") || "day"
  ); // day, month, quarter, year
  const [chartType, setChartType] = useState(
    searchParams.get("chartType") || "line"
  ); // line, bar
  const [dateRange, setDateRange] = useState(() => {
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");
    return startDate && endDate ? [startDate, endDate] : [];
  });

  const [chartData, setChartData] = useState({}); // Data for the chart
  const [tableData, setTableData] = useState([]); // Data for the table

  const dispatch = useDispatch();

  const {
    loader,
    totalSales,
    totalOrders,
    totalUsers,
    totalProducts,
    errorMessage,
    chart,
    table,
  } = useSelector((state) => state.stat);

  const columns = [
    {
      title: "Date/Month/Quarter/Year",
      dataIndex: "period",
      key: "period",
      align: "center",
    },
    {
      title: "Total Revenue",
      dataIndex: "totalRevenue",
      key: "totalRevenue",
      align: "center",
    },
    {
      title: "Orders",
      dataIndex: "orders",
      key: "orders",
      align: "center",
    },
    {
      title: "% Growth",
      dataIndex: "growth",
      key: "growth",
      align: "center",
    },
  ];

  useEffect(() => {
    setSearchParams({
      timeFilter,
      chartType,
      ...(dateRange.length === 2 && {
        startDate: dateRange[0],
        endDate: dateRange[1],
      }),
    });
  }, [timeFilter, chartType, dateRange, setSearchParams]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(get_revennue_stats({ timeFilter, dateRange }));
    }, 300);

    return () => clearTimeout(timeout);
  }, [timeFilter, dateRange, dispatch]);

  useEffect(() => {
    const chartData = {
      labels: chart?.labels || [],
      datasets: [
        {
          label: "Revenue",
          data: chart?.data || [],
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };

    const tableData = table?.map((item, index) => ({
      key: index + 1,
      period: item.period,
      totalRevenue: item.totalRevenue,
      orders: item.orders,
      growth: item.growth,
    }));

    setChartData(chartData);
    setTableData(tableData);
  }, [chart, table]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md p-4 rounded-md">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center mb-5">
          <h1 className="text-xl font-bold w-full sm:w-auto">
            Revenue Statistics
          </h1>
          <Space size="middle" className="w-full sm:w-auto mt-3 sm:mt-0">
            <Select
              value={timeFilter}
              onChange={(value) => setTimeFilter(value)}
              options={[
                { value: "day", label: "Day" },
                { value: "month", label: "Month" },
                { value: "quarter", label: "Quarter" },
                { value: "year", label: "Year" },
              ]}
              placeholder="Select time period"
              className="w-full sm:w-auto"
            />
            <DatePicker.RangePicker
              onChange={(dates) => {
                if (dates && dates.length === 2) {
                  const fmtDates = dates.map((date) =>
                    date?.format("YYYY-MM-DD")
                  );
                  setDateRange(fmtDates);
                } else {
                  setDateRange([]);
                }
              }}
              value={
                dateRange.length === 2
                  ? [
                      dayjs(dateRange[0], "YYYY-MM-DD"),
                      dayjs(dateRange[1], "YYYY-MM-DD"),
                    ]
                  : undefined
              }
              format="YYYY-MM-DD"
              className="w-full sm:w-auto"
            />
            <Button
              type="primary"
              onClick={() =>
                dispatch(get_revennue_stats({ timeFilter, dateRange }))
              }
              className="w-full sm:w-auto sm:mt-0"
            >
              Apply
            </Button>
          </Space>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-5">
          <div className="bg-blue-100 p-4 rounded-md shadow">
            <p className="text-sm font-semibold">Total Revenue</p>
            <p className="text-lg font-bold">{totalSales} VND</p>
          </div>
          <div className="bg-green-100 p-4 rounded-md shadow">
            <p className="text-sm font-semibold">Total Orders</p>
            <p className="text-lg font-bold">{totalOrders}</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-md shadow">
            <p className="text-sm font-semibold">Total Products</p>
            <p className="text-lg font-bold">{totalProducts}</p>
          </div>
          <div className="bg-red-100 p-4 rounded-md shadow">
            <p className="text-sm font-semibold">New User</p>
            <p className="text-lg font-bold">{totalUsers}</p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="mb-5">
          <div className="flex flex-wrap justify-between items-center mb-3">
            <h2 className="text-lg font-bold w-full sm:w-auto">
              Revenue Chart
            </h2>
            <Space className="w-full sm:w-auto mt-3 sm:mt-0" size="middle">
              <Button
                type={chartType === "line" ? "primary" : "default"}
                onClick={() => setChartType("line")}
                className="w-full sm:w-auto mb-2 sm:mb-0"
              >
                Line Chart
              </Button>
              <Button
                type={chartType === "bar" ? "primary" : "default"}
                onClick={() => setChartType("bar")}
                className="w-full sm:w-auto"
              >
                Bar Chart
              </Button>
            </Space>
          </div>
          {chartData?.datasets?.length ? (
            chartType === "line" ? (
              <Line data={chartData} />
            ) : (
              <Bar data={chartData} />
            )
          ) : (
            <p>Loading chart data...</p>
          )}
        </div>

        {/* Table Section */}
        <div className="mb-5">
          <h2 className="text-lg font-bold mb-3">Details Table</h2>
          <div className="overflow-x-auto">
            <Table
              columns={columns}
              dataSource={tableData}
              loading={loader}
              pagination={{ pageSize: 5 }}
              scroll={{ x: "max-content" }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueDashboard;
