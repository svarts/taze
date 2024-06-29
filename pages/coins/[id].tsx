import { GetStaticProps, GetStaticPaths, NextPage } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Box, Image, Text, Flex, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, VStack, Heading, Divider, IconButton, Badge, Select } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, ChartData, ChartOptions, TimeScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import 'chartjs-adapter-date-fns';
import { useEffect, useState } from 'react';
import { CoinDetailProps } from '@/types';

ChartJS.register(TimeScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const CoinDetail: NextPage<CoinDetailProps> = ({ coin }) => {
  const router = useRouter();
  const [chartData, setChartData] = useState<ChartData<'line'>>({
    datasets: [],
  });
  const [timeFrame, setTimeFrame] = useState('7');

  const handleBackClick = () => {
    router.push('/');
  };

  useEffect(() => {
    const fetchChartData = async () => {
      const response = await axios.get(`https://api.coingecko.com/api/v3/coins/${coin.id}/market_chart`, {
        params: {
          vs_currency: 'usd',
          days: timeFrame,
        },
      });
      const data = response.data.prices.map((price: [number, number]) => ({
        x: new Date(price[0]),
        y: price[1],
      }));
      setChartData({
        labels: data.map((d: { x: Date }) => d.x),
        datasets: [
          {
            label: 'Price over Time',
            data: data.map((d: { x: Date; y: number }) => d.y),
            fill: true,
            backgroundColor: 'rgba(75,192,192,0.2)',
            borderColor: 'rgba(75,192,192,1)',
            borderWidth: 2,
            pointRadius: 1,
          },
        ],
      });
    };

    fetchChartData();
  }, [coin.id, timeFrame]);

  const options: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      x: {
        type: 'time',
        time: {
          unit: timeFrame === '1' ? 'hour' : 'day',
        },
        grid: {
          display: false,
        },
      },
      y: {
        beginAtZero: false,
        grid: {
          display: true,
        },
      },
    },
    elements: {
      line: {
        tension: 0.4,
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  return (
    <Box p="5" borderWidth="1px" borderColor="#6366f1" borderRadius="lg" overflow="hidden" boxShadow="lg" backgroundColor="#1e1b4b" color="white">
      <IconButton
        aria-label="Back"
        icon={<ArrowBackIcon />}
        onClick={handleBackClick}
        colorScheme="whiteAlpha"
        variant="ghost"
        color="white"
        mb="4"
      />
      <VStack spacing="5" alignItems="center">
        <Box display="flex" flexDirection="column" alignItems="center">
          <Image src={coin.image} alt={coin.name} boxSize="150px" borderRadius="full" marginBottom={3} />
          <Heading as="h1" size="xl" textAlign="center">{coin.name}</Heading>
        </Box>
        <Divider borderColor="#6366f1" borderWidth="1px" w="full" />
        <Flex w="full" justifyContent="space-between">
          <Box flex="1" mr="4">
            <Flex alignItems="center">
              <Stat>
                <StatLabel fontSize="2xl" marginBottom={2}>Current Price</StatLabel>
                <Flex alignItems="center">
                  <Badge
                    colorScheme={coin.price_change_percentage_24h_in_currency >= 0 ? 'green' : 'red'}
                    fontSize="3xl"
                    borderRadius="full"
                    marginBottom={3}
                  >
                    ${coin.current_price.toLocaleString()}
                  </Badge>
                  <StatHelpText ml={5}>
                    <StatHelpText color="white" fontSize="xl">
                      <StatArrow type={coin.price_change_percentage_24h_in_currency >= 0 ? 'increase' : 'decrease'} />
                      {coin.price_change_percentage_24h_in_currency.toFixed(2)}%
                    </StatHelpText>
                  </StatHelpText>
                </Flex>
              </Stat>
            </Flex>
            <Flex mt="4" justifyContent="space-between">
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
            <Box mt="4">
              <Heading as="h2" size="md" mb="2">Description</Heading>
              <Text fontSize="sm" color="gray.500">{coin.description}</Text>
            </Box>
          </Box>
          <Box flex="1" h="auto" display="flex" flexDirection="column" justifyContent="center">
            <Select value={timeFrame} onChange={(e) => setTimeFrame(e.target.value)} bg="none" color="white" mb="4">
              <option value="1">24 Hours</option>
              <option value="7">7 Days</option>
              <option value="30">30 Days</option>
              <option value="365">1 Year</option>
            </Select>
            {chartData.datasets.length > 0 && (
              <Box flex="1">
                <Line data={chartData} options={options} height={200} />
              </Box>
            )}
          </Box>
        </Flex>
      </VStack>
    </Box>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const apiBaseURL = 'https://api.coingecko.com/api/v3';
  const response = await axios.get(`${apiBaseURL}/coins/list`);
  const paths = response.data.map((coin: { id: string }) => ({
    params: { id: coin.id }
  }));

  return {
    paths,
    fallback: false
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params!;
  const apiBaseURL = 'https://api.coingecko.com/api/v3';
  const response = await axios.get(`${apiBaseURL}/coins/${id}`);
  const coin = {
    id: response.data.id,
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