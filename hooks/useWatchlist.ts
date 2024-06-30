import { useState } from 'react';
import { ICoin } from '@/types';

export const useWatchlist = () => {
    const [watchlist, setWatchlist] = useState<ICoin[]>([]);

    const addToWatchlist = (coin: ICoin) => {
        watchlist.some(c => c.id === coin.id) ? null : setWatchlist(prev => [...prev, coin]);
    };

    const removeFromWatchlist = (id: string) => {
        watchlist.some(c => c.id === id) ? setWatchlist(prev => prev.filter(c => c.id !== id)) : null;
    };

    return { watchlist, addToWatchlist, removeFromWatchlist };
};
