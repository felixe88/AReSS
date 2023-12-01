import React from "react";
import * as Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const polmone = () => {
  const option = {
    chart: {
      type: {
        text: "My chart",
      },
      series: [
        {
          data: [1, 2, 1, 4, 3, 6],
        },
      ],
    },
  };

  return (
    <div className="h-40">
      <p>Grafici</p>
      <div>
        <HighchartsReact highcahrts={Highcharts} option={option} />
      </div>
    </div>
  );
};
export default polmone;
