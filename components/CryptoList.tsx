import React, { useState } from 'react';
import { Box, Image, Text, Flex, Input, Button } from '@chakra-ui/react';
import { ICoin } from '@/types'; 

interface CryptoListProps {
    cryptos: ICoin[];
    onAddToWatchlist: (coin: ICoin) => void;
}

const CryptoList: React.FC<CryptoListProps> = ({ cryptos, onAddToWatchlist }) => {
    const [search, setSearch] = useState<string>('');

    const filteredCryptos = cryptos.filter((crypto) =>
        crypto.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <Flex direction="column" p="5">
            <Input
                placeholder="Search for a cryptocurrency..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {filteredCryptos.map((crypto) => (
                <Box key={crypto.id} p="5" borderWidth="1px" borderRadius="lg">
                    <Image src={crypto.image} alt={crypto.name} boxSize="50px" />
                    <Text fontSize="lg">{crypto.name}</Text>
                    <Text>Price: ${crypto.current_price}</Text>
                    <Text>Change: {crypto.price_change_percentage_24h}%</Text>
                    <Text>Volume: {crypto.total_volume}</Text>
                    <Button onClick={() => onAddToWatchlist(crypto)}>Add to Watchlist</Button>
                </Box>
            ))}
        </Flex>
    );
};

export default CryptoList;
