import React, { useEffect, useState } from 'react';
import CryptoCard from '@/components/CryptoCard';
import SearchBar from '@/components/SearchBar';
import { fetchCoins } from '@/services/api';

interface Coin {
    id: string;
    name: string;
    image: string;
    current_price: number;
    price_change_percentage_24h: number;
    total_volume: number;
}

const HomePage: React.FC = () => {
    const [coins, setCoins] = useState<Coin[]>([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const loadCoins = async () => {
            const data = await fetchCoins();
            setCoins(data);
        };
        loadCoins();
    }, []);

    const handleSearch = (value: string) => {
        setSearchText(value);
    };

    return (
        <div style={{ padding: '20px' }}>
            <SearchBar onSearch={handleSearch} />
            <div>
                {coins.filter(coin => coin.name.toLowerCase().includes(searchText.toLowerCase())).map(coin => (
                    <div key={coin.id}>
                        <CryptoCard coin={coin} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
