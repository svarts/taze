import axios from 'axios';
import axiosRetry from 'axios-retry';
import rateLimit from 'axios-rate-limit';
import { logError } from './logger';

const apiBaseURL = 'https://api.coingecko.com/api/v3';

const axiosInstance = axios.create({
    baseURL: apiBaseURL,
    timeout: 10000,
});

axiosRetry(axiosInstance, {
    retries: 3,
    retryDelay: retryCount => retryCount * 1000,
    retryCondition: error => error.response?.status === 429,
});

const http = rateLimit(axiosInstance, {
    maxRequests: 5,
    perMilliseconds: 1000,
    maxRPS: 5,
});

let cache: any = null;
let lastFetchTime = 0;
const CACHE_DURATION = 60 * 1000;

export const fetchCoins = async () => {
    const now = Date.now();
    const isCacheValid = cache && (now - lastFetchTime < CACHE_DURATION);

    return isCacheValid
        ? cache
        : http.get('/coins/markets', {
            params: {
                vs_currency: 'usd',
                order: 'market_cap_desc',
                per_page: 100,
                page: 1,
                sparkline: true,
                price_change_percentage: '24h,7d,30d,1y',
            },
        })
            .then(response => {
                cache = response.data;
                lastFetchTime = now;
                return response.data;
            })
            .catch(error => {
                logError(error);
                throw error;
            });
};
