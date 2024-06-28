import React from 'react';
import { Box, Grid, Heading, Divider } from '@chakra-ui/react';
import { CryptoListProps } from '@/types';
import CryptoCard from './CryptoCard';

export const CryptoList: React.FC<CryptoListProps> = ({ cryptos, onAddToWatchList }) => {
    return (
        <Box p="8" borderRadius="xl" >
            <Heading mb="5" textAlign="center" color="teal.500">Cryptocurrency Tracker</Heading>
            <Divider mb="5" borderColor="#1e293b"/>
            <Grid templateColumns="repeat(3, 1fr)" gap={8}>
                {cryptos.map((crypto) => (
                    <CryptoCard key={crypto.id} coin={crypto} onAddToWatchList={onAddToWatchList} />
                ))}
            </Grid>
        </Box>
    );
};