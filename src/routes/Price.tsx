import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchTicker } from "../api";

interface IPriceProps {
  coinId: string;
}

interface IPriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}
const Description = styled.p`
  margin: 5px 0px;
  text-align: center;
  font-size: 15px;
`;
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.403);
  padding: 20px 20px;
  border-radius: 10px;
  margin-bottom: 10px;
`;
const OverviewVertical = styled(Overview)`
  flex-direction: column;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

function Price({ coinId }: IPriceProps) {
  const { isLoading, data } = useQuery<IPriceData>(["IPriceData", coinId], () =>
    fetchTicker(coinId)
  );
  console.log(data);

  return (
    <div>
      <Overview>
        <OverviewItem>
          <span>Market Cap</span>
          <span>{data?.quotes.USD.market_cap} $</span>
        </OverviewItem>
        <OverviewItem>
          <span>Market Cap Change in 25H</span>
          <span>{data?.quotes.USD.market_cap_change_24h} %</span>
        </OverviewItem>
        <OverviewItem>
          <span>All Time High Price</span>
          <span>{data?.quotes.USD.ath_price} $</span>
        </OverviewItem>
      </Overview>
      <OverviewVertical>
        <Description>Percent Change</Description>
        <Overview>
          <OverviewItem>
            <span>in a year:</span>
            <span>{data?.quotes.USD.percent_change_1y} %</span>
          </OverviewItem>
          <OverviewItem>
            <span>in 7 days:</span>
            <span>{data?.quotes.USD.percent_change_7d} %</span>
          </OverviewItem>
          <OverviewItem>
            <span>in 6 hours:</span>
            <span>{data?.quotes.USD.percent_change_6h} %</span>
          </OverviewItem>
          <OverviewItem>
            <span>15 minutes:</span>
            <span>{data?.quotes.USD.percent_change_15m} %</span>
          </OverviewItem>
        </Overview>
      </OverviewVertical>
    </div>
  );
}

export default Price;
