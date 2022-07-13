import { info } from "console";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import {
  Switch,
  Route,
  useLocation,
  useParams,
  Link,
  useRouteMatch,
} from "react-router-dom";
import styled from "styled-components";
import { fetchInfo, fetchTicker } from "../api";
import Chart from "./Chart";
import Price from "./Price";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Title = styled.h1`
  font-size: 40px;
  color: ${(props) => props.theme.accentColor};
`;
const Loader = styled.span`
  text-align: center;
  display: block;
  font-size: 20px;
`;
interface RouteParams {
  coinId: string;
}
interface RouteState {
  name: string;
}
// 콘솔에서 로그로 띄운뒤 마우스 우클릭 전역 변수 저장 후,
// Object.values(temp2).map( v => typeof(v) ).join() 으로 변환해서 복사 붙여넣기
// 좀 귀찮아도 해놓으면 자동완성 및 에러 출력 해준다
interface IInfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
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
const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
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
const Description = styled.p`
  margin: 20px 0px;
`;
const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;
const Tab = styled.div<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    display: block;
  }
`;

const CoinBackButton = styled.button`
  background-color: rgba(0, 0, 0, 0.5);
  color: ${(prop) => prop.theme.textColor};
  border-radius: 5px;
  padding: 2px 2px;
  text-align: center;
  font-size: 10;
`;

function Coin(theme: any) {
  // From Route in Router.tsx
  const { coinId } = useParams<RouteParams>();
  // From Link in Coins.tsx
  const { state } = useLocation<RouteState>();
  const chartMatch = useRouteMatch(`/${coinId}/chart`);
  const priceMatch = useRouteMatch(`/${coinId}/price`);

  // useQuery 사용으로 useState, useEffect 간결하게 대체 가능
  // useQuery 두번 사용하기 때문에 리턴받는 변수명 변경해야 한다.
  const { isLoading: infoLoading, data: infoData } = useQuery<IInfoData>(
    ["info", coinId],
    () => fetchInfo(coinId)
  );
  const { isLoading: tickerLoading, data: tickerData } = useQuery<IPriceData>(
    ["ticker", coinId],
    () => fetchTicker(coinId),
    {
      // refetchInterval: 1000,
    }
  );
  // const [loading, setLoading] = useState(true);
  // const [info, setInfo] = useState<IInfoData>();
  // const [priceInfo, setPriceInfo] = useState<IPriceData>();

  // useEffect(() => {
  //   (async () => {
  //     const infoData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
  //     ).json();
  //     const priceData = await (
  //       await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
  //     ).json();
  //     setInfo(infoData);
  //     setPriceInfo(priceData);
  //     setLoading(false);
  //   })();
  // }, []);
  const loading = infoLoading || tickerLoading;

  return (
    <Container>
      <Helmet>
        <Title>
          {state?.name ? state.name : loading ? "loading..." : infoData?.name}
        </Title>
      </Helmet>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "loading..." : infoData?.name}
        </Title>
        <CoinBackButton>
          <Link to={`/`}>Back</Link>
        </CoinBackButton>
      </Header>
      {loading === true ? <Loader>Loading...</Loader> : <span></span>}
      <Overview>
        <OverviewItem>
          <span>Rank:</span>
          <span>{infoData?.rank}</span>
        </OverviewItem>
        <OverviewItem>
          <span>Symbol:</span>
          <span>{infoData?.symbol}</span>
        </OverviewItem>
        <OverviewItem>
          <span>Price:</span>
          <span>{tickerData?.quotes.USD.price} $</span>
        </OverviewItem>
      </Overview>
      <Description>{infoData?.description}</Description>
      <Overview>
        <OverviewItem>
          <span>Total Suply:</span>
          <span>{tickerData?.total_supply}</span>
        </OverviewItem>
        <OverviewItem>
          <span>Max Supply:</span>
          <span>{tickerData?.max_supply}</span>
        </OverviewItem>
      </Overview>
      <Tabs>
        <Tab isActive={chartMatch !== null}>
          <Link to={`/${coinId}/chart`}>Chart</Link>
        </Tab>
        <Tab isActive={priceMatch !== null}>
          <Link to={`/${coinId}/price`}>Price</Link>
        </Tab>
      </Tabs>
      <Switch>
        {/* -- Nested Route -- */}
        {/* url 주소를 활용하여 다른 컴포넌트를 포함하여 랜더링 가능 */}
        {/* path={`/:coinId/price`} 도 가능 */}
        <Route path={`/:coinId/price`}>
          <Price coinId={coinId} />
        </Route>
        <Route path={`/:coinId/chart`}>
          <Chart coinId={coinId} />
        </Route>
      </Switch>
    </Container>
  );
}
export default Coin;
