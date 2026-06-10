import {useState, useRef } from 'react';

export function useSearchResult(){
    const [data, setData] =useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const cache = useRef(null);

    setIsLoading(true);

    const searchRes = async ({year, period}={}) => {
        if (cache.current) cache.current.abort();
        cache.current = new AbortController();
        const signal = cache.current.signal;

        try{
            const params = new URLSearchParams();
            if(year) params.append('year', year);
            if(period) params.append('period', period);

            const req = await fetch(`api/year-period?${params.toString()}`, { signal });
            const res = await req.json();

            if(!req.ok) throw new Error(res.message || 'Failed to fetch data');
            setData(res.data || []);
        }
        catch(err){
            if (err.name === 'AbortError') setError(err.message);
        }finally{
            setIsLoading(false)
        }
    };

    const cancelSearch = () => {
        if (cache.current) cache.current.abort();
    };

    return {data, isLoading, error, searchRes, cancelSearch};
}