import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { fetchCoins } from '@/services/api';
import { CryptoList } from '@/components/CryptoList';
import { WatchList } from '@/components/WatchList';
import { useState, useEffect } from 'react';
import { ICoin, NewsArticle } from '@/types';
import { logError } from '@/services/logger';
import { Avatar, AvatarBadge, Input, Box, Container, Button, Stack } from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';

export const getStaticProps: GetStaticProps = async () => {
    try {
        const coins = await fetchCoins(1);
        const newsResponse = await axios.get('https://api.coingecko.com/api/v3/news');
        const news: NewsArticle[] = newsResponse.data.data;
        return { props: { coins, news } };
    } catch (error) {
        logError(error as Error);
        return { props: { coins: [], news: [] } };
    }
};

type HomePageProps = InferGetStaticPropsType<typeof getStaticProps>;

const HomePage: React.FC<HomePageProps> = ({ coins, news }) => {
    const [searchText, setSearchText] = useState<string>('');
    const [watchlist, setWatchlist] = useState<ICoin[]>([]);
    const [showWelcome, setShowWelcome] = useState(true);
    const [allCoins, setAllCoins] = useState<ICoin[]>(coins);
    const [page, setPage] = useState<number>(2);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [showNews, setShowNews] = useState(false);

    useEffect(() => {
        localStorage.getItem('hasVisitedBefore') ? setShowWelcome(false) : setShowWelcome(true);
    }, []);

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
            setHasMore(newCoins.length === 0 ? false : true);
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
        localStorage.setItem('hasVisitedBefore', 'true');
    };

    return (
        <>
            {showWelcome ? (
                <div className="welcome-page">
                    <h1 className="welcome-text">Welcome to Crypto Tracking App</h1>
                    <Button className="welcome-link" onClick={handleLinkClick}>Enter</Button>
                </div>
            ) : (
                <Container maxW="container.xl">
                    <Box mb="5" display="flex" justifyContent="space-between" alignItems="center" p="6" gap={4}>
                        <Input
                            placeholder="Search Cryptocurrencies"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            width={{ base: "70%", md: "400px" }}
                            bg="none"
                            borderColor="gray.600"
                            textColor={searchText ? 'white' : 'gray.400'}
                            borderRadius="xl"
                        />
                        {/* <Stack >
                            <Button onClick={() => setShowNews(!showNews)} colorScheme="teal" variant="outline">
                                For the latest crypto news
                            </Button>
                            {showNews ? <NewsList news={news} /> : null}
                        </Stack> */}
                        <Avatar>
                            <AvatarBadge boxSize='1.25em' bg='#2dd4bf' />
                        </Avatar>
                    </Box>
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
                        endMessage={<p style={{ textAlign: 'center', color: 'white' }}><b>Yay! You have seen it all</b></p>}
                    >
                        <CryptoList
                            cryptos={filteredCoins}
                            onAddToWatchList={(coin: ICoin) => handleWatchlistChange(coin, true)}
                            isWatchList={false}
                        />
                    </InfiniteScroll>
                </Container>
            )}
        </>
    );
};

export default HomePage;