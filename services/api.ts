import axios from 'axios';

const apiBaseURL = 'https://api.coingecko.com/api/v3';

export const fetchCoins = async () => {
    const response = await axios.get(`${apiBaseURL}/coins/markets`, {
        params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: 100,
            page: 1,
            sparkline: true,
            price_change_percentage: '24h,7d,30d,1y'
        }
    });
    return response.data;
};