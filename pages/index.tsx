import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { fetchCoins } from '@/services/api';
import { CryptoList } from '@/components/CryptoList';
import { WatchList } from '@/components/WatchList';
import { useState, useEffect } from 'react';
import { ICoin, NewsArticle } from '@/types';
import { logError } from '@/services/logger';
import { Avatar, AvatarBadge, Input, Box, Container, Button, InputGroup, InputLeftElement, VStack, Flex, Link } from '@chakra-ui/react';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from 'axios';
import { SearchIcon } from '@chakra-ui/icons';

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
                    <Box mb="5" display="flex" flexDirection={{ base: 'column', md: 'row' }} alignItems={{ base: 'flex-start', md: 'center' }} p="6" gap={4}>
                        <Flex flexDirection={{ base: 'row', md: 'row' }} alignItems="center" width="100%">
                            <InputGroup width="100%">
                                <InputLeftElement pointerEvents="none">
                                    <SearchIcon color="gray.400" />
                                </InputLeftElement>
                                <Input
                                    placeholder="Search Cryptocurrencies"
                                    value={searchText}
                                    onChange={(e) => setSearchText(e.target.value)}
                                    bg="#111827"
                                    borderColor="gray.600"
                                    textColor={searchText ? "white" : "gray.400"}
                                    borderRadius="lg"
                                    width={500}
                                />
                            </InputGroup>
                        </Flex>
                        <Link href="/news" className="gradient-text link-hover" mt={{ base: 0, md: 4 }}>
                            ✨ Check for the latest crypto news!
                        </Link>
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
                        loader={<h4 style={{ textAlign: "center", color: "#4b5563" }}>Loading...</h4>}
                        endMessage={<p style={{ textAlign: "center", color: "white", marginBottom: "30px" }}><b>Yay! You have seen it all</b></p>}
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