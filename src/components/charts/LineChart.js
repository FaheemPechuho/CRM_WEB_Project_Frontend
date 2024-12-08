import { useColorModeValue } from "@chakra-ui/system";
import React from "react";
import ReactApexChart from "react-apexcharts";

const ApexChart = (props) => {
  const { data } = props;
    const colrvalue = useColorModeValue("brand.500", "brand.500");


  const state = {
    series: [
      {
        name: 'Data',
        data: data?.map((item) => item.length)
      }
    ],
    options: {
      colors: ["#c92524", "#fff"],
      chart: {
        height: 350,
        type: 'bar',
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          columnWidth: '40%',
        }
      },
      stroke: {
        width: 2
      },
      grid: {
        row: {
          colors: ['#fff', '#f2f2f2']
        }
      },
      xaxis: {
        categories: data?.map((item) => item.name),
        tickPlacement: 'on'
      },
      
    },
  };
  return (
    <div id="chart">
      <ReactApexChart options={state.options} series={state.series} type="bar" height={350}  />
    </div>
  );
};

export default ApexChart;


