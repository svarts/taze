import React from 'react';
import { Box, Image, Text, Tooltip, IconButton, Stat, StatGroup, StatLabel, StatNumber, StatHelpText, StatArrow, Badge } from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { CryptoCardProps } from '@/types';
import NextLink from 'next/link';

const CryptoCard: React.FC<CryptoCardProps> = ({ coin, onAddToWatchList }) => (
    <Box borderWidth="1px" borderColor="#334155" borderRadius="xl" overflow="hidden" p="4" boxShadow="md" backgroundColor="#111827" display="flex" flexDirection="column">
        <Box display="flex" justifyContent="space-between" alignItems="center" mb="4">
            <NextLink href={`/coins/${coin.id}`} passHref>
                <Box display="flex" alignItems="center">
                    <Image src={coin.image} alt={coin.name} boxSize="60px" borderRadius="full" loading="lazy" mr="3" />
                    <Text fontSize="md" fontWeight="bold" color="white">{coin.name}</Text>
                </Box>
            </NextLink>
            <Tooltip label="Add to Watchlist" placement="top">
                <IconButton
                    aria-label="Add to Watchlist"
                    icon={<StarIcon boxSize={4} />}
                    colorScheme="none"
                    variant="ghost"
                    color="#fbbf24"
                    _hover={{ color: "#fde047" }}
                    onClick={(e) => {
                        e.stopPropagation();
                        onAddToWatchList(coin);
                    }}
                />
            </Tooltip>
        </Box>
        <NextLink href={`/coins/${coin.id}`} passHref>
            <Box cursor="pointer" textAlign="left" color="white">
                <StatGroup>
                    <Stat>
                        <StatLabel color="white" fontSize="md" marginBottom={3}>Price</StatLabel>
                        <Badge
                            colorScheme={coin.price_change_percentage_24h >= 0 ? 'green' : 'red'}
                            fontSize="lg"
                            borderRadius="full"
                            marginBottom={3}
                        >
                            ${coin.current_price}
                        </Badge>
                        <StatHelpText color="white" fontSize="md">
                            <StatArrow type={coin.price_change_percentage_24h >= 0 ? 'increase' : 'decrease'} />
                            {coin.price_change_percentage_24h}%
                        </StatHelpText>
                    </Stat>
                    <Stat>
                        <StatLabel color="white" marginBottom={3}>24h Volume</StatLabel>
                        <Badge colorScheme="purple" fontSize="lg" borderRadius="full">{coin.total_volume}</Badge>
                    </Stat>
                </StatGroup>
            </Box>
        </NextLink>
    </Box>
);

export default CryptoCard;