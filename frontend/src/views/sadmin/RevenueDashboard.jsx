import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Line, Bar } from "react-chartjs-2";
import { DatePicker, Space, Select, Button, Table } from "antd";
import "antd/dist/reset.css";
import { useDispatch, useSelector } from "react-redux";
import { get_revennue_stats } from "./../../store/Reducers/statReducer";
import { toast } from "react-hot-toast";

const RevenueDashboard = () => {
  const [timeFilter, setTimeFilter] = useState("day"); // day, month, quarter, year
  const [chartType, setChartType] = useState("line"); // line, bar
  const [dateRange, setDateRange] = useState([]); // For date range filter
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
    },
    {
      title: "Total Revenue",
      dataIndex: "totalRevenue",
      key: "totalRevenue",
    },
    {
      title: "Orders",
      dataIndex: "orders",
      key: "orders",
    },
    {
      title: "% Growth",
      dataIndex: "growth",
      key: "growth",
    },
  ];

  // Function to fetch data
  const fetchData = async () => {
    dispatch(get_revennue_stats({ timeFilter, dateRange }));

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

    console.log(table);
    console.log("chartData", chartData);
    console.log("tableData", tableData);

    setChartData(chartData);
    setTableData(tableData);
  };

  useEffect(() => {
    fetchData();
  }, [timeFilter, dateRange]);

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage);
    }
  }, [errorMessage]);

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md p-4 rounded-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-xl font-bold">Revenue Statistics</h1>
          <Space size="middle">
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
            />
            <DatePicker.RangePicker
              onChange={(dates) => {
                const fmtDates = dates.map((date) => date.format("YYYY-MM-DD"));
                setDateRange(fmtDates);
              }}
              format="YYYY-MM-DD"
            />
            <Button type="primary" onClick={fetchData}>
              Apply
            </Button>
          </Space>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-4 gap-4 mb-5">
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
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold">Revenue Chart</h2>
            <Space>
              <Button
                type={chartType === "line" ? "primary" : "default"}
                onClick={() => setChartType("line")}
              >
                Line Chart
              </Button>
              <Button
                type={chartType === "bar" ? "primary" : "default"}
                onClick={() => setChartType("bar")}
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
        <div>
          <h2 className="text-lg font-bold mb-3">Details Table</h2>
          <Table
            columns={columns}
            dataSource={tableData}
            loading={loader}
            pagination={{ pageSize: 5 }}
          />
        </div>
      </div>
    </div>
  );
};

export default RevenueDashboard;
