import { Box, Container, Flex, Link, Heading, Button } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { ICoin, HomePageProps } from '@/types';
import { SearchBar } from '@/components/SearchBar';
import InfiniteScroll from 'react-infinite-scroll-component';
import { CryptoList } from '@/components/CryptoList';
import { WatchList } from '@/components/WatchList';
import { fetchCoins } from '@/services/api';
import { logError } from '@/services/logger';

export const getStaticProps = async () => {
    try {
        const coins = await fetchCoins(1);
        return { props: { coins } };
    } catch (error) {
        logError(error as Error);
        return { props: { coins: [] } };
    }
};

const HomePage: React.FC<HomePageProps> = ({ coins }) => {
    const [searchText, setSearchText] = useState<string>('');
    const [watchlist, setWatchlist] = useState<ICoin[]>([]);
    const [showWelcome, setShowWelcome] = useState(true);
    const [allCoins, setAllCoins] = useState<ICoin[]>(coins);
    const [hasMore, setHasMore] = useState<boolean>(true);

    useEffect(() => {
        const visited = localStorage.getItem('hasVisitedBefore');
        setShowWelcome(!visited);
    }, []);

    const handleWatchlistChange = (coin: ICoin, isAdding: boolean) => {
        setWatchlist(prev => isAdding
            ? (prev.find(c => c.id === coin.id) ? prev : [...prev, coin])
            : prev.filter(c => c.id !== coin.id)
        );
    };

    const fetchMoreCoins = async () => {
        try {
            const newCoins = await fetchCoins(allCoins.length / 50 + 1);
            setAllCoins(prevCoins => [...prevCoins, ...newCoins]);
            setHasMore(newCoins.length > 0);
        } catch (error) {
            logError(error as Error);
            setHasMore(false);
        }
    };

    const filteredCoins = allCoins.filter(coin =>
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
                    <Image src="/taze-logo.svg" alt="Taze Logo" width={60} height={60} />
                    <Flex alignItems="center" mb={4}>
                        <Heading size="xl">Taze</Heading>
                    </Flex>
                    <Heading className="welcome-text" size="md">Welcome to the Crypto Tracking App</Heading>
                    <Button
                        className="welcome-link"
                        onClick={handleLinkClick}
                        rightIcon={<ArrowForwardIcon />}
                        _hover={{ transform: 'translateX(10px)' }}
                        transition="transform 0.6s ease-in-out"
                    >
                        Enter
                    </Button>
                </div>
            ) : (
                <Container maxW="container.xl">
                    <Box mb="5" display="flex" flexDirection={{ base: 'column', md: 'row' }} alignItems={{ base: 'flex-start', md: 'center' }} p="6" gap={4}>
                        <Flex flexDirection={{ base: 'row', md: 'row' }} alignItems="center" width="100%">
                            <SearchBar value={searchText} onChange={(e) => setSearchText(e.target.value)} />
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