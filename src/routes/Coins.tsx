import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  padding-left: 10px;
  display: flex;
  font-size: 15px;
  background-color: rgba(0, 0, 0, 0.403);
  align-items: center;
  color: ${(props) => props.theme.textColor};
  margin-bottom: 10px;
  border-radius: 10px;
  a {
    padding: 20px 10px;
    transition: color 0.2s ease-in;
    display: block;
  }
  &:hover {
    // <Link> 안의 css 수정하는데 a를 사용하는 이유는 Link가 나중에 a로 변환됨
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  padding-bottom: 10px;
  font-size: 40px;
  color: ${(props) => props.theme.textColor};
`;

interface ICoins {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Loader = styled.span`
  text-align: center;
  display: block;
  font-size: 20px;
`;

const Img = styled.img`
  width: 25px;
  height: 25px;
`;

function Coins() {
  const { isLoading, data } = useQuery<ICoins[]>("allCoins", fetchCoins);
  // const [coins, setCoins] = useState<ICoins[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   // ( () => () )(); 이렇게 하면 함수 바로 실행
  //   (async () => {
  //     const response = await fetch("https://api.coinpaprika.com/v1/coins");
  //     const json = await response.json();
  //     setCoins(json.slice(0, 100));
  //   })();
  //   setLoading(false);
  // }, []);

  return (
    <Container>
      <Helmet>
        <Title>Coins</Title>
      </Helmet>
      <Header>
        <Title>Coins</Title>
      </Header>
      {isLoading === true ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => {
            // console.log(coin.id);
            return (
              <Coin key={coin.id}>
                <Img
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                ></Img>
                <Link
                  to={{
                    pathname: `/${coin.id}`,
                    state: { name: coin.name },
                  }}
                >
                  {coin.id} ({coin.symbol}) &rarr;
                </Link>
              </Coin>
            );
          })}
        </CoinsList>
      )}
    </Container>
  );
}
export default Coins;
