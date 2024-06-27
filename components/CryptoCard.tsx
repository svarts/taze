import React from 'react';
import { Box, Image, Text } from '@chakra-ui/react';

interface Coin {
    name: string;
    image: string;
    current_price: number;
    price_change_percentage_24h: number;
    total_volume: number;
}

const CryptoCard: React.FC<{ coin: Coin }> = ({ coin }) => (
    <Box maxW="sm" borderWidth="1px" borderRadius="xl" overflow="hidden" p="5">
        <Image src={coin.image} alt={coin.name} boxSize="50px" />
        <Text fontSize="lg">Price: ${coin.current_price}</Text>
        <Text>Change: {coin.price_change_percentage_24h}%</Text>
        <Text>Volume: {coin.total_volume}</Text>
    </Box>
);

export default CryptoCard;