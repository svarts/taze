import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { fetchCoins } from '@/services/api';
import { CryptoList } from '@/components/CryptoList';
import { WatchList } from '@/components/WatchList';
import { useState } from 'react';
import { ICoin } from '@/types';
import { logError } from '@/services/logger';

export const getStaticProps: GetStaticProps = async () => {
    try {
        const coins = await fetchCoins();
        return { props: { coins } };
    } catch (error) {
        logError(error as Error);
        return { props: { coins: [] } }; 
    }
};

type HomePageProps = InferGetStaticPropsType<typeof getStaticProps>;

const HomePage: React.FC<HomePageProps> = ({ coins }) => {
    const [searchText, setSearchText] = useState<string>('');
    const [watchlist, setWatchlist] = useState<ICoin[]>([]);

    const handleWatchlistChange = (coin: ICoin, isAdding: boolean) => {
        setWatchlist(prev => isAdding
            ? prev.find(c => c.id === coin.id) ? prev : [...prev, coin]
            : prev.filter(c => c.id !== coin.id)
        );
    };

    const filteredCoins = coins.filter((coin: { name: string; }) =>
        coin.name.toLowerCase().includes(searchText.toLowerCase())
    );

    return (
        <div style={{ padding: '20px' }}>
            {watchlist.length > 0 && (
                <WatchList
                    watchlist={watchlist}
                    onRemoveFromWatchlist={(id: string) => handleWatchlistChange({ id } as ICoin, false)}
                    isWatchlist={true}
                />
            )}
            <CryptoList
                cryptos={filteredCoins}
                onAddToWatchList={(coin: ICoin) => handleWatchlistChange(coin, true)}
                isWatchList={false}
            />
        </div>
    );
};

export default HomePage;
