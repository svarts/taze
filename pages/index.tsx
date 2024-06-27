import React, { useEffect, useState } from 'react';
import CryptoList from '@/components/CryptoList';
import SearchBar from '@/components/SearchBar';
import { fetchCoins } from '@/services/api';
import { ICoin } from '@/types';

const HomePage: React.FC = () => {
    const [coins, setCoins] = useState<ICoin[]>([]);
    const [searchText, setSearchText] = useState('');
    const [watchlist, setWatchlist] = useState<ICoin[]>([]);

    useEffect(() => {
        const loadCoins = async () => {
            try {
                const data = await fetchCoins();
                setCoins(data);
            } catch (error) {
                console.log('failed to fetch coins:', error);
            }
        };
        loadCoins();
    }, []);

    const handleWatchlistChange = (coin: ICoin, isAdding: boolean) => {
        setWatchlist(prev => isAdding 
            ? prev.find(c => c.id === coin.id) ? prev : [...prev, coin] 
            : prev.filter(c => c.id !== coin.id)
        );
    };

    const filteredCoins = coins.filter(coin => 
        coin.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div style={{ padding: '20px' }}>
            <CryptoList
                cryptos={filteredCoins}
                onAddToWatchlist={(coin) => handleWatchlistChange(coin, true)}
            />
            {watchlist.length > 0 && (
                <CryptoList
                    cryptos={watchlist}
                    onAddToWatchlist={(coin) => handleWatchlistChange(coin, false)}
                    isWatchlist={true}
                />
            )}
        </div>
    );
};

export default HomePage;