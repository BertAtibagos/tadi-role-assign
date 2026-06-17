import { useState, useRef } from 'react';

export function useClassList(){
    const [data, setData] =useState([]);
    const [error, setError] = useState(null);
    const cache = useRef(null);

    const fetchSearchRes = async (year, period, section) => {
        if (cache.current) cache.current.abort();
        cache.current = new AbortController();
        const signal = cache.current.signal;

        try{
            const searchResReq = await fetch(`api/classList`,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({yearId: year, periodId: period, sectionId: section}),
                signal
            });

            const searchResRes = await searchResReq.json();

            if(!searchResReq.ok) throw new Error(searchResRes.message || 'Failed to fetch data');
            setData(searchResRes.data || []);
        }
        catch(err){
            if (err.name === 'AbortError') setError(err.message);
        }
    };

    return {data, error, fetchSearchRes};
}