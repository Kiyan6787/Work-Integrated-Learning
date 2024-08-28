"use client";
import ReactApexChart from "react-apexcharts";

const options: any = {
  chart: {
    type: "donut",
  },
  colors: ["#3C50E0", "#80CAEE"],
  labels: ["Complete", "Incomplete"],
  legend: {
    show: true,
    position: "bottom",
  },

  plotOptions: {
    pie: {
      donut: {
        size: "65%",
        background: "transparent",
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

export default function PieChart({complete, incomplete}: {complete: number, incomplete: number}) {
  return (
    <ReactApexChart
      options={options}
      series={[complete, incomplete]}
      type="donut"
    />
  );
}
