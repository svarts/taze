import React from 'react';
import { Box, Grid } from '@chakra-ui/react';
import { CryptoListProps } from '@/types';
import CryptoCard from './CryptoCard';

export const CryptoList: React.FC<CryptoListProps> = ({ cryptos, onAddToWatchList }) => {
    return (
        <Box p="5">
            <Grid templateColumns="repeat(auto-fill, minmax(300px, 1fr))" gap={6}>
                {cryptos.map((crypto) => (
                    <CryptoCard key={crypto.id} coin={crypto} onAddToWatchList={onAddToWatchList} />
                ))}
            </Grid>
        </Box>
    );
};