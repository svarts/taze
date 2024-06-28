import React from 'react';
import { Box, Image, Text, Grid, Tooltip, IconButton } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import NextLink from 'next/link';
import { ICoin } from '@/types';

interface CryptoListProps {
    cryptos: ICoin[];
    onAddToWatchlist: (coin: ICoin) => void;
    isWatchlist?: boolean;
}

const CryptoList: React.FC<CryptoListProps> = ({ cryptos, onAddToWatchlist }) => {
    return (
        <Box p="5">
            <Grid templateColumns="repeat(4, 1fr)" gap={6}>
                {cryptos.map((crypto) => (
                    <Box key={crypto.id} borderWidth="1px" borderRadius="lg" overflow="hidden" p="5">
                        <NextLink href={`/coins/${crypto.id}`} passHref>
                            <Image src={crypto.image} alt={crypto.name} boxSize="50px" />
                            <Text fontSize="lg">{crypto.name}</Text>
                            <Text>Price: ${crypto.current_price}</Text>
                            <Text>Change: {crypto.price_change_percentage_24h}%</Text>
                            <Text>Volume: {crypto.total_volume}</Text>
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
                                    onAddToWatchlist(crypto);
                                }}
                                mt="2"
                            />
                        </Tooltip>
                    </Box>
                ))}
            </Grid>
        </Box>
    );
};

export default CryptoList;