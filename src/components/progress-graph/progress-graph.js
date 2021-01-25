import React from "react";
import Paper from "@material-ui/core/Paper";
import { Line } from "react-chartjs-2";

const ProgressGraph = (props) => {
  const data = {
    datasets: [
      {
        label: "Progress over time",
        data: [],
        borderColor: "rgba(23,36,205, 1)",
        borderWidth: 1,
        lineTension: 0,
      },
    ],
  };

  const options = {
    scales: {
      xAxes: [
        {
          type: "time",
        },
      ],
      yAxes: [
        {
          ticks: {
            callback: function (value, index, values) {
              return toSize(value);
            },
          },
        },
      ],
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          return toSize(tooltipItem.yLabel);
        },
      },
    },
  };

  data.datasets[0].data = props.progress.map(({ created_at, amount }) => {
    return { x: created_at, y: amount };
  });

  const toSize = (size) => {
    const e = (Math.log(size) / Math.log(1024)) | 0;
    const unit = "KMGTPEZY"[e - 1] || "";
    const num = size / Math.pow(1024, e);
    const round = Math.round(num);
    return `${round > 100 ? round : num.toFixed(round > 10 ? 1 : 2)}${unit}B`;
  };

  return (
    <Paper variant="outlined">
      <Line data={data} height={400} width={600} options={options} />
    </Paper>
  );
};

export default ProgressGraph;
