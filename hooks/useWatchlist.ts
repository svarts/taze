import { useState, useEffect } from 'react';
import { ICoin } from '@/types';

export const useWatchlist = () => {
    const [watchlist, setWatchlist] = useState<ICoin[]>(() => (
        typeof window !== "undefined"
            ? localStorage.getItem('watchlist')
                ? JSON.parse(localStorage.getItem('watchlist') || '[]')
                : []
            : []
    ));

    useEffect(() => {
        typeof window !== "undefined" && localStorage.setItem('watchlist', JSON.stringify(watchlist));
    }, [watchlist]);

    const addToWatchlist = (coin: ICoin) => {
        !watchlist.some(c => c.id === coin.id) && setWatchlist(prev => [...prev, coin]);
    };

    const removeFromWatchlist = (id: string) => {
        watchlist.some(c => c.id === id) && setWatchlist(prev => prev.filter(c => c.id !== id));
    };

    return { watchlist, addToWatchlist, removeFromWatchlist };
};