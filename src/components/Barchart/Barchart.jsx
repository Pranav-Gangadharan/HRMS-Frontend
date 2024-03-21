import "./barChart.css";
import {
  BarChart,
  Bar,
  Rectangle,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const data = [
  {
    name: "2017",
    TotalOutcome: 60,
    TotalIncome: 100,
    amt: 40,
  },
  {
    name: "2018",
    TotalOutcome: 70,
    TotalIncome: 80,
    amt: 10,
  },
  {
    name: "2019",
    TotalOutcome: 55,
    TotalIncome: 90,
    amt: 45,
  },
  {
    name: "2020",
    TotalOutcome: 90,
    TotalIncome: 100,
    amt: 10,
  },
  {
    name: "2021",
    TotalOutcome: 50,
    TotalIncome: 80,
    amt: 30,
  },
  {
    name: "2022",
    TotalOutcome: 90,
    TotalIncome: 100,
    amt: 10,
  },
  {
    name: "2023",
    TotalOutcome: 50,
    TotalIncome: 90,
    amt: 40,
  },
];

const Barchart = () => {
  return (
    <div className="charts flex">
      <h2 className="title">Total Revenue</h2>
      <BarChart
        width={500}
        height={300}
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 0,
          bottom: 5,
        }}
      >
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="TotalIncome"
          fill="#8884d8"
          activeBar={<Rectangle fill="pink" stroke="blue" />}
        />
        <Bar
          dataKey="TotalOutcome"
          fill="#82ca9d"
          activeBar={<Rectangle fill="gold" stroke="purple" />}
        />
      </BarChart>
    </div>
  );
};

export default Barchart;
