import React from "react";
import ReactEcharts from "echarts-for-react";
import * as echarts from "echarts";
import { TableData } from "./table";
import moment from "moment";
interface Props {
  data: TableData[];
}
const BasicChart = ({ data }: Props) => {
  const option = {
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["T1", "T2", "T3", "F1", "F2", "F3", "M1", "M2", "H1", "H2"],
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: data.map((item) =>
        moment(new Date(item.date_added)).format("DD.MM.yy | HH:mm:ss")
      ),
    },
    yAxis: {
      type: "value",
    },
    series: [
      {
        name: "T1",
        type: "line",
        smooth: true,
        color: "#880808",
        data: data.map((item) => item.T1),
      },
      {
        name: "T2",
        type: "line",
        smooth: true,
        color: "#00008B",
        data: data.map((item) => item.T2),
      },
      {
        name: "T3",
        type: "line",
        smooth: true,
        color: "red",
        data: data.map((item) => item.T3),
      },
      {
        name: "F1",
        type: "line",
        smooth: true,
        color: "#A020F0",
        data: data.map((item) => item.F1),
      },
      {
        name: "F2",
        type: "line",
        smooth: true,
        color: "#17e5fb",
        data: data.map((item) => item.F2),
      },
      {
        name: "F3",
        type: "line",
        smooth: true,
        color: "green",
        data: data.map((item) => item.F3),
      },
      {
        name: "M1",
        type: "line",
        smooth: true,
        color: "#fb934e",
        data: data.map((item) => item.M1),
      },
      {
        name: "M2",
        type: "line",
        smooth: true,
        color: "#4f5354",
        data: data.map((item) => item.M2),
      },
      {
        name: "H1",
        type: "line",
        smooth: true,
        color: "#1748fb",
        data: data.map((item) => item.H1),
      },
      {
        name: "H2",
        type: "line",
        smooth: true,
        color: "#91fbf8",
        data: data.map((item) => item.H2),
      },
    ],
  };

  return (
    <ReactEcharts option={option} style={{ height: "100%", width: "100%" }} />
  );
};

export default BasicChart;
