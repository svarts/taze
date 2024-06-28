import React from 'react';
import { Box, Image, Text, Flex, IconButton, Tooltip } from '@chakra-ui/react';
import { MinusIcon } from '@chakra-ui/icons';
import { ICoin } from '@/types';

interface WatchListProps {
    watchlist: ICoin[];
    onRemoveFromWatchlist: (id: string) => void;
    isWatchlist?: boolean;
}

const WatchList: React.FC<WatchListProps> = ({ watchlist, onRemoveFromWatchlist }) => {
    return (
        <Flex direction="row" p="5">
            {watchlist.map((crypto) => (
                <Box key={crypto.id} p="1" borderWidth="1px" borderRadius="lg">
                    <Flex align="center" gap="5">
                        <Image src={crypto.image} alt={crypto.name} boxSize="50px" />
                        <Box flex="1">
                            <Text fontSize="md">{crypto.name}</Text>
                            <Text fontSize="sm">${crypto.current_price}</Text>
                        </Box>
                        <Tooltip label="Remove from watchlist" placement="top">
                            <IconButton
                                aria-label="Remove from watchlist"
                                icon={<MinusIcon />}
                                colorScheme="red"
                                variant="solid"
                                onClick={() => onRemoveFromWatchlist(crypto.id)}
                            />
                        </Tooltip>
                    </Flex>
                </Box>
            ))}
        </Flex>
    );
};

export default WatchList;