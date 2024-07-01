import React from 'react';
import { Box, Image, Text, Flex, IconButton, Tooltip, Badge } from '@chakra-ui/react';
import { MinusIcon } from '@chakra-ui/icons';
import { WatchListProps } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion(Box);

export const WatchList: React.FC<WatchListProps> = ({ watchlist, onRemoveFromWatchlist }) => {
    return (
        <Flex direction="row" p="6" flexWrap="wrap" gap="4">
            <AnimatePresence>
                {watchlist.map((crypto) => (
                    <MotionBox
                        key={crypto.id}
                        p="4"
                        borderWidth="1px"
                        borderRadius="full"
                        borderColor="#374151"
                        backgroundColor="#111827"
                        cursor="pointer"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        onClick={() => window.location.href = `/coins/${crypto.id}`}
                    >
                        <Flex align="center" gap="4">
                            <Image src={crypto.image} alt={crypto.name} boxSize="50px" borderRadius="full" />
                            <Box flex="1" color="white">
                                <Text fontSize="md" fontWeight="bold">{crypto.name}</Text>
                                <Badge
                                    colorScheme={crypto.price_change_percentage_24h >= 0 ? 'green' : 'red'}
                                    fontSize="sm"
                                    borderRadius="full"
                                    marginTop={2}
                                >
                                    ${crypto.current_price}
                                </Badge>
                            </Box>
                            <Tooltip label="Remove from watchlist" placement="top">
                                <IconButton
                                    aria-label="Remove from watchlist"
                                    icon={<MinusIcon />}
                                    colorScheme="red"
                                    variant="solid"
                                    borderRadius="full"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onRemoveFromWatchlist(crypto.id);
                                    }}
                                />
                            </Tooltip>
                        </Flex>
                    </MotionBox>
                ))}
            </AnimatePresence>
        </Flex>
    );
};