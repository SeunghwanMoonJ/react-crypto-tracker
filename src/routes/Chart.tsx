import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { isDarkAtom } from "../atoms";

interface IChartProps {
  coinId: string;
}
interface IPriceHistory {
  close: string;
  high: string;
  low: string;
  market_cap: number;
  open: string;
  time_close: number;
  time_open: number;
  volume: string;
}

function Chart({ coinId }: IChartProps) {
  const {
    isLoading,
    isError,
    error,
    data: datas,
  } = useQuery<IPriceHistory[]>(
    ["priceHistory", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 10000,
    }
  );

  const datasForCandleChart = datas?.map((data) => ({
    x: new Date(data.time_close),
    y: [data.open, data.high, data.low, data.close],
  }));
  const isDark = useRecoilValue(isDarkAtom);

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data: datasForCandleChart as [],
            },
          ]}
          options={{
            chart: {
              foreColor: isDark ? "#F0EDCC" : "#02343F",
              type: "candlestick",
              height: 300,
              width: 500,
              toolbar: {
                show: true,
              },
              background: "transparent",
            },
            grid: {
              show: true,
            },
            stroke: {
              curve: "straight",
              width: 1,
            },
            xaxis: {
              type: "datetime",
            },
            yaxis: {
              tooltip: {
                enabled: true,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;
