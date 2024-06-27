import React from 'react';
import { Box, Image, Text, Flex, Button } from '@chakra-ui/react';
import { ICoin } from '@/types';

interface WatchlistProps {
    watchlist: ICoin[];
    onRemoveFromWatchlist: (id: string) => void;
}

export const Watchlist: React.FC<WatchlistProps> = ({ watchlist, onRemoveFromWatchlist }) => {
    return (
        <Flex direction="column" p="5">
            {watchlist.map((crypto) => (
                <Box key={crypto.id} p="5" borderWidth="1px" borderRadius="lg">
                    <Image src={crypto.image} alt={crypto.name} boxSize="50px" />
                    <Text fontSize="lg">{crypto.name}</Text>
                    <Text>Price: ${crypto.current_price}</Text>
                    <Button onClick={() => onRemoveFromWatchlist(crypto.id)}>Remove</Button>
                </Box>
            ))}
        </Flex>
    );
};
