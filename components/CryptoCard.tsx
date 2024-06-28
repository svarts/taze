import React from 'react';
import { Box, Image, Text, Tooltip, IconButton } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { CryptoCardProps } from '@/types';
import NextLink from 'next/link';

const CryptoCard: React.FC<CryptoCardProps> = ({ coin, onAddToWatchList }) => (
    <Box maxW="xs" borderWidth="1px" borderRadius="lg" overflow="hidden" p="4" boxShadow="md">
        <NextLink href={`/coins/${coin.id}`} passHref>
            <Box cursor="pointer">
                <Image src={coin.image} alt={coin.name} boxSize="40px" mx="auto" mb="3" loading="lazy" />
                <Text fontSize="md" fontWeight="bold" textAlign="center">{coin.name}</Text>
                <Text fontSize="sm" textAlign="center">Price: ${coin.current_price}</Text>
                <Text fontSize="sm" textAlign="center">Change: {coin.price_change_percentage_24h}%</Text>
                <Text fontSize="sm" textAlign="center">Volume: {coin.total_volume}</Text>
            </Box>
        </NextLink>
        <Tooltip label="Add to Watchlist" placement="top">
            <IconButton
                aria-label="Add to Watchlist"
                icon={<StarIcon />}
                colorScheme="none"
                variant="ghost"
                color="#fbbf24"
                _hover={{ color: "#fde047" }}
                onClick={(e) => {
                    e.stopPropagation();
                    onAddToWatchList(coin);
                }}
                mt="2"
                w="full"
            />
        </Tooltip>
    </Box>
);

export default CryptoCard;
