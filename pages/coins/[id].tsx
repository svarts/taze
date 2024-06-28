import { GetServerSideProps, NextPage } from 'next';
import axios from 'axios';
import { Box, Image, Text } from '@chakra-ui/react';

interface CoinDetailProps {
  coin: {
    image: string;
    name: string;
    current_price: number;
    price_change_percentage_24h_in_currency: number;
    market_cap: number;
    low_24h: number;
    high_24h: number;
    description: string;
  };
}

const CoinDetail: NextPage<CoinDetailProps> = ({ coin }) => {
  return (
    <Box p="5">
      <Image src={coin.image} alt={coin.name} boxSize="100px" />
      <Text fontSize="2xl">{coin.name}</Text>
      <Text>Price: ${coin.current_price}</Text>
      <Text>24h Change: {coin.price_change_percentage_24h_in_currency}%</Text>
      <Text>Market Cap: ${coin.market_cap.toLocaleString()}</Text>
      <Text>Low 24h: ${coin.low_24h} / High 24h: ${coin.high_24h}</Text>
      <Text>Description: {coin.description}</Text>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.params!;
  const apiBaseURL = 'https://api.coingecko.com/api/v3';
  const response = await axios.get(`${apiBaseURL}/coins/${id}`);

  const coin = {
    image: response.data.image.large,
    name: response.data.name,
    current_price: response.data.market_data.current_price.usd,
    price_change_percentage_24h_in_currency: response.data.market_data.price_change_percentage_24h_in_currency.usd,
    market_cap: response.data.market_data.market_cap.usd,
    low_24h: response.data.market_data.low_24h.usd,
    high_24h: response.data.market_data.high_24h.usd,
    description: response.data.description.en
  };

  return { props: { coin } };
};

export default CoinDetail;