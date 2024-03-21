import "./lineChart.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const data = [
  {
    name: "2017",
    TotalSales: 60,
    TotalRevenue: 100,
    amt: 40,
  },
  {
    name: "2018",
    TotalSales: 70,
    TotalRevenue: 80,
    amt: 10,
  },
  {
    name: "2019",
    TotalSales: 55,
    TotalRevenue: 90,
    amt: 45,
  },
  {
    name: "2020",
    TotalSales: 90,
    TotalRevenue: 100,
    amt: 10,
  },
  {
    name: "2021",
    TotalSales: 50,
    TotalRevenue: 80,
    amt: 30,
  },
  {
    name: "2022",
    TotalSales: 90,
    TotalRevenue: 100,
    amt: 10,
  },
  {
    name: "2023",
    TotalSales: 50,
    TotalRevenue: 90,
    amt: 40,
  },
];

const Linechart = () => {
  return (
    <div className="charts flex">
      <h2 className="title">Sales Overview</h2>
      <LineChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 10,
          bottom: 5,
        }}
      >
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="TotalSales"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
        <Line type="monotone" dataKey="TotalRevenue" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
};

export default Linechart;
