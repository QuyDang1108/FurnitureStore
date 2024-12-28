import React, { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import { Line, Bar } from "react-chartjs-2";
import { DatePicker, Space, Select, Button, Table } from "antd";
import "antd/dist/reset.css";

const RevenueDashboard = () => {
  const [timeFilter, setTimeFilter] = useState("day"); // day, month, quarter, year
  const [chartType, setChartType] = useState("line"); // line, bar
  const [dateRange, setDateRange] = useState([]); // For date range filter
  const [chartData, setChartData] = useState({}); // Data for the chart
  const [tableData, setTableData] = useState([]); // Data for the table
  const [loading, setLoading] = useState(false);

  const columns = [
    {
      title: "Ngày/Tháng/Quý/Năm",
      dataIndex: "period",
      key: "period",
    },
    {
      title: "Tổng doanh thu",
      dataIndex: "totalRevenue",
      key: "totalRevenue",
    },
    {
      title: "Đơn hàng",
      dataIndex: "orders",
      key: "orders",
    },
    {
      title: "% Tăng trưởng",
      dataIndex: "growth",
      key: "growth",
    },
  ];

  // Function to fetch data
  const fetchData = async () => {
    setLoading(true);
    // Mock fetch data logic here
    const mockChartData = {
      labels: ["1 Jan", "2 Jan", "3 Jan", "4 Jan"],
      datasets: [
        {
          label: "Doanh thu",
          data: [1000, 2000, 1500, 3000],
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };

    const mockTableData = [
      {
        key: "1",
        period: "1 Jan",
        totalRevenue: 1000,
        orders: 10,
        growth: "5%",
      },
      {
        key: "2",
        period: "2 Jan",
        totalRevenue: 2000,
        orders: 20,
        growth: "10%",
      },
    ];

    setChartData(mockChartData);
    setTableData(mockTableData);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, [timeFilter, dateRange]);

  return (
    <div className="p-5 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md p-4 rounded-md">
        {/* Header */}
        <div className="flex justify-between items-center mb-5">
          <h1 className="text-xl font-bold">Thống kê doanh thu</h1>
          <Space size="middle">
            <Select
              value={timeFilter}
              onChange={(value) => setTimeFilter(value)}
              options={[
                { value: "day", label: "Ngày" },
                { value: "month", label: "Tháng" },
                { value: "quarter", label: "Quý" },
                { value: "year", label: "Năm" },
              ]}
              placeholder="Chọn khoảng thời gian"
            />
            <DatePicker.RangePicker
              onChange={(dates) => setDateRange(dates)}
              format="YYYY-MM-DD"
            />
            <Button type="primary" onClick={fetchData}>
              Áp dụng
            </Button>
          </Space>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-4 gap-4 mb-5">
          <div className="bg-blue-100 p-4 rounded-md shadow">
            <p className="text-sm font-semibold">Tổng doanh thu</p>
            <p className="text-lg font-bold">50,000,000 VND</p>
          </div>
          <div className="bg-green-100 p-4 rounded-md shadow">
            <p className="text-sm font-semibold">Tổng đơn hàng</p>
            <p className="text-lg font-bold">1,200</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-md shadow">
            <p className="text-sm font-semibold">Doanh thu trung bình</p>
            <p className="text-lg font-bold">41,666 VND</p>
          </div>
          <div className="bg-red-100 p-4 rounded-md shadow">
            <p className="text-sm font-semibold">Tăng trưởng</p>
            <p className="text-lg font-bold">10%</p>
          </div>
        </div>

        {/* Chart Section */}
        <div className="mb-5">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-bold">Biểu đồ doanh thu</h2>
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
            <p>Đang tải dữ liệu biểu đồ...</p>
          )}
        </div>

        {/* Table Section */}
        <div>
          <h2 className="text-lg font-bold mb-3">Bảng chi tiết</h2>
          <Table
            columns={columns}
            dataSource={tableData}
            loading={loading}
            pagination={{ pageSize: 5 }}
          />
        </div>
      </div>
    </div>
  );
};

export default RevenueDashboard;
