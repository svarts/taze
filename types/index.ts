export interface ICoin {
    id: string;
    name: string;
    image: string;
    current_price: number;
    price_change_percentage_24h: number;
    total_volume: number;
}  