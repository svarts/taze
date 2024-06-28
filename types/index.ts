export interface ICoin {
    id: string;
    name: string;
    image: string;
    current_price: number;
    price_change_percentage_24h: number;
    total_volume: number;
    market_cap: number;
    low_24h: number;
    high_24h: number;
}

export interface CoinDetailProps {
    coin: {
        image: string;
        name: string;
        current_price: number;
        price_change_percentage_24h_in_currency: number;
        market_cap: number;
        low_24h: number;
        high_24h: number;
        description: string;
    };
}

export interface CryptoCardProps {
    coin: ICoin;
    onAddToWatchList: (coin: ICoin) => void;
}

export interface CryptoListProps {
    cryptos: ICoin[];
    onAddToWatchList: (coin: ICoin) => void;
    isWatchList?: boolean;
}

export interface WatchListProps {
    watchlist: ICoin[];
    onRemoveFromWatchlist: (id: string) => void;
    isWatchlist?: boolean;
}