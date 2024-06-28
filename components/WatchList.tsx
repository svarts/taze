import React from 'react';
import { Box, Image, Text, Flex, IconButton, Tooltip } from '@chakra-ui/react';
import { MinusIcon } from '@chakra-ui/icons';
import { WatchListProps } from '@/types';

export const WatchList: React.FC<WatchListProps> = ({ watchlist, onRemoveFromWatchlist }) => {
    return (
        <Flex direction="row" p="5" flexWrap="wrap" gap="4">
            {watchlist.map((crypto) => (
                <Box 
                    key={crypto.id} 
                    p="4" 
                    borderWidth="1px" 
                    borderRadius="full" 
                    borderColor="#312e81" 
                    backgroundColor="#1e1b4b"
                >
                    <Flex align="center" gap="4">
                        <Image src={crypto.image} alt={crypto.name} boxSize="50px" borderRadius="full" />
                        <Box flex="1" color="white">
                            <Text fontSize="md" fontWeight="bold">{crypto.name}</Text>
                            <Text fontSize="sm">${crypto.current_price}</Text>
                        </Box>
                        <Tooltip label="Remove from watchlist" placement="top">
                            <IconButton
                                aria-label="Remove from watchlist"
                                icon={<MinusIcon />}
                                colorScheme="red"
                                variant="solid"
                                borderRadius="full"
                                onClick={() => onRemoveFromWatchlist(crypto.id)}
                            />
                        </Tooltip>
                    </Flex>
                </Box>
            ))}
        </Flex>
    );
};