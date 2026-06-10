import {useState, useRef} from 'react';

export function usePrograms() {
    const [programs, setPrograms] = useState([]);
    const [prgErr, setErr] = useState(null);
    const cache = useRef(null);

    const fetchPrograms =  async({yearid, periodId}={})=>{
        if (cache.current) cache.current.abort();
        cache.current = new AbortController();
        const signal = cache.current.signal;

        try{
            const params = new URLSearchParams();
            if(yearid) params.append('yearId', yearid);
            if(periodId) params.append('periodId', periodId);

            const prgReq = await fetch(`/api/programs?${params.toString()}`,{signal})
            const prgRes = await prgReq.json();

            if(prgReq.ok && prgRes.success){
                setPrograms(prgRes.data ?? []);
                setErr(null);
            }else{
                setErr(prgRes.message ?? 'Failed to fetch programs');
            }
        }catch(err){
            setErr(err.message);
            console.log('Something went wrong: ', err);
        }
    }

    return {programs, prgErr, fetchPrograms};
}