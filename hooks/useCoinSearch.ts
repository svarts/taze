import { useState } from 'react';
import { ICoin } from '@/types';

export const useCoinSearch = (initialCoins: ICoin[]) => {
    const [searchText, setSearchText] = useState('');
    const [allCoins, setAllCoins] = useState<ICoin[]>(initialCoins);
    const [hasMore, setHasMore] = useState(true);

    const fetchMoreCoins = async (fetchFunction: (page: number) => Promise<ICoin[]>) => {
        try {
            const nextPage = Math.floor(allCoins.length / 50) + 1;
            const newCoins = await fetchFunction(nextPage);
            setAllCoins(prev => [...prev, ...newCoins]);
            setHasMore(newCoins.length > 0);
        } catch (error) {
            console.error('Error fetching more coins:', error);
            setHasMore(false);
        }
    };

    const filteredCoins = allCoins.filter(coin => coin.name.toLowerCase().includes(searchText.toLowerCase()));

    return { searchText, setSearchText, filteredCoins, fetchMoreCoins, hasMore };
};