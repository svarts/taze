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
    maxRequests: 30, 
    perMilliseconds: 60 * 1000,
    maxRPS: 0.5, 
});

let cache: any = null;
let lastFetchTime = 0;
const CACHE_DURATION = 60 * 1000;

export const fetchCoins = async (page: number) => {
    const now = Date.now();
    const isCacheValid = cache && (now - lastFetchTime < CACHE_DURATION);

    return isCacheValid && page === 1
        ? cache
        : http.get('/coins/markets', {
            params: {
                vs_currency: 'usd',
                order: 'market_cap_desc',
                per_page: 20,
                page: page,
                sparkline: true,
                price_change_percentage: '24h,7d,30d,1y',
            },
        })
            .then(response => {
                page === 1 ? (cache = response.data, lastFetchTime = now) : null;
                return response.data;
            })
            .catch(error => {
                logError(error as Error);
                throw error;
            });
};
