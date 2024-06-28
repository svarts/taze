import { GetServerSideProps, NextPage } from 'next';
import axios from 'axios';
import { Box, Image, Text, Flex, Stat, StatLabel, StatNumber, StatHelpText, VStack, Heading, Divider } from '@chakra-ui/react';
import { CoinDetailProps } from '@/types';

const CoinDetail: NextPage<CoinDetailProps> = ({ coin }) => {
  return (
    <Box p="5" maxW="1000px" mx="auto" mt="10" borderWidth="1px" borderRadius="lg" overflow="hidden" boxShadow="lg">
      <VStack spacing="5">
        <Image src={coin.image} alt={coin.name} boxSize="100px" />
        <Heading as="h1" size="xl" textAlign="center">{coin.name}</Heading>
        <Divider />
        <Stat>
          <StatLabel>Current Price</StatLabel>
          <StatNumber>${coin.current_price.toLocaleString()}</StatNumber>
          <StatHelpText>
            <Text color={coin.price_change_percentage_24h_in_currency >= 0 ? "green.500" : "red.500"}>
              {coin.price_change_percentage_24h_in_currency.toFixed(2)}%
            </Text>
          </StatHelpText>
        </Stat>
        <Flex justifyContent="space-between" w="100%">
          <Stat>
            <StatLabel>Market Cap</StatLabel>
            <StatNumber>${coin.market_cap.toLocaleString()}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>Low (24h)</StatLabel>
            <StatNumber>${coin.low_24h.toLocaleString()}</StatNumber>
          </Stat>
          <Stat>
            <StatLabel>High (24h)</StatLabel>
            <StatNumber>${coin.high_24h.toLocaleString()}</StatNumber>
          </Stat>
        </Flex>
        <Box w="100%">
          <Heading as="h2" size="md" mb="2">Description</Heading>
          <Text>{coin.description}</Text>
        </Box>
      </VStack>
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
