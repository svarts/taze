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