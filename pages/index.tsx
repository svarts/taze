import { Box, Container, Flex, Link, Heading, Button } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import InfiniteScroll from 'react-infinite-scroll-component';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { HomePageProps } from '@/types';
import { SearchBar } from '@/components/SearchBar';
import { CryptoList } from '@/components/CryptoList';
import { WatchList } from '@/components/WatchList';
import { useCoinSearch } from '@/hooks/useCoinSearch';
import { useWatchlist } from '@/hooks/useWatchlist';
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
    const { searchText, setSearchText, filteredCoins, fetchMoreCoins, hasMore } = useCoinSearch(coins);
    const { watchlist, addToWatchlist, removeFromWatchlist } = useWatchlist();
    const [showWelcome, setShowWelcome] = useState(true);

    useEffect(() => {
        const visited = localStorage.getItem('hasVisitedBefore');
        setShowWelcome(!visited);
    }, []);

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
                    <WatchList
                        watchlist={watchlist}
                        onRemoveFromWatchlist={removeFromWatchlist}
                        isWatchlist={true}
                    />
                    <InfiniteScroll
                        dataLength={filteredCoins.length}
                        next={() => fetchMoreCoins(fetchCoins)}
                        hasMore={hasMore}
                        loader={<h4 style={{ textAlign: "center", color: "#4b5563" }}>Loading...</h4>}
                        endMessage={<p style={{ textAlign: "center", color: "white", marginBottom: "30px" }}><b>Yay! You have seen it all</b></p>}
                    >
                        <CryptoList
                            cryptos={filteredCoins}
                            onAddToWatchList={addToWatchlist}
                            isWatchList={false}
                        />
                    </InfiniteScroll>
                </Container>
            )}
        </>
    );
};

export default HomePage;