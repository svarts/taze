import axios from 'axios';

const apiBaseURL = 'https://api.coingecko.com/api/v3';

export const fetchCoins = async () => {
    const response = await axios.get(`${apiBaseURL}/coins/markets`, {
        params: {
            vs_currency: 'usd'
        }
    });
    return response.data;
};