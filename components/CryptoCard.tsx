import React from 'react';
import { Box, Image, Text } from '@chakra-ui/react';
import { ICoin } from '@/types';

const CryptoCard: React.FC<{ coin: ICoin }> = ({ coin }) => (
    <Box maxW="sm" borderWidth="1px" borderRadius="xl" overflow="hidden" p="5">
        <Image src={coin.image} alt={coin.name} boxSize="10px" />
        <Text fontSize="lg">Price: ${coin.current_price}</Text>
        <Text>Change: {coin.price_change_percentage_24h}%</Text>
        <Text>Volume: {coin.total_volume}</Text>
    </Box>
);

export default CryptoCard;