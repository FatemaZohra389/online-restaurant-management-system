import React from "react";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  Tooltip,
  YAxis,
  Legend,
  Bar,
} from "recharts";

const BarGraph = ({ data }) => {
  return (
    <div>
      <ResponsiveContainer width="99%" aspect={3}>
        <BarChart
          width={100}
          height={500}
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          <Bar dataKey="order" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarGraph;
