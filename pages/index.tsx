import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { fetchCoins } from '@/services/api';
import { CryptoList } from '@/components/CryptoList';
import { WatchList } from '@/components/WatchList';
import { useState } from 'react';
import { ICoin } from '@/types';
import { logError } from '@/services/logger';
import { Avatar, AvatarBadge } from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroll-component';

export const getStaticProps: GetStaticProps = async () => {
    try {
        const coins = await fetchCoins(1);
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
    const [showWelcome, setShowWelcome] = useState(true);
    const [allCoins, setAllCoins] = useState<ICoin[]>(coins);
    const [page, setPage] = useState<number>(2);
    const [hasMore, setHasMore] = useState<boolean>(true);

    const handleWatchlistChange = (coin: ICoin, isAdding: boolean) => {
        setWatchlist(prev => isAdding
            ? prev.find(c => c.id === coin.id) ? prev : [...prev, coin]
            : prev.filter(c => c.id !== coin.id)
        );
    };

    const fetchMoreCoins = async () => {
        try {
            const newCoins = await fetchCoins(page);
            setAllCoins(prevCoins => [...prevCoins, ...newCoins]);
            setPage(prevPage => prevPage + 1);
            if (newCoins.length === 0) setHasMore(false);
        } catch (error) {
            logError(error as Error);
            setHasMore(false);
        }
    };

    const filteredCoins = allCoins.filter((coin: { name: string; }) =>
        coin.name.toLowerCase().includes(searchText.toLowerCase())
    );

    const handleLinkClick = () => {
        setShowWelcome(false);
    };

    return (
        <>
            {showWelcome ? (
                <div className="welcome-page">
                    <h1 className="welcome-text">Welcome to Crypto Tracking App</h1>
                    <a className="welcome-link" onClick={handleLinkClick}>Enter</a>
                </div>
            ) : (
                <div>
                    <Avatar>
                        <AvatarBadge boxSize='1.25em' bg='teal.500' />
                    </Avatar>
                    {watchlist.length > 0 && (
                        <WatchList
                            watchlist={watchlist}
                            onRemoveFromWatchlist={(id: string) => handleWatchlistChange({ id } as ICoin, false)}
                            isWatchlist={true}
                        />
                    )}
                    <InfiniteScroll
                        dataLength={filteredCoins.length}
                        next={fetchMoreCoins}
                        hasMore={hasMore}
                        loader={<h4>Loading...</h4>}
                        endMessage={<p style={{ textAlign: 'center' }}><b>Yay! You have seen it all</b></p>}
                    >
                        <CryptoList
                            cryptos={filteredCoins}
                            onAddToWatchList={(coin: ICoin) => handleWatchlistChange(coin, true)}
                            isWatchList={false}
                        />
                    </InfiniteScroll>
                </div>
            )}
        </>
    );
};

export default HomePage;
