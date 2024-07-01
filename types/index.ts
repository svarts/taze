import { ChartData } from "chart.js";

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

export interface HomePageProps {
    coins: ICoin[];
}

export interface CoinDetailProps {
    coin: {
        id: number;
        image: string;
        name: string;
        current_price: number;
        price_change_percentage_24h_in_currency: number;
        market_cap: number;
        low_24h: number;
        high_24h: number;
        description: string;
    };
    initialChartData: ChartData<'line'>;
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
export interface NewsArticle {
    title: string;
    description: string;  
    author: string | null; 
    updated_at: number;  
    url: string;
    news_site: string; 
    thumb_2x: string | null;
}


export interface NewsPageProps {
    newsArticles: NewsArticle[];
}

export interface SearchBarProps {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}