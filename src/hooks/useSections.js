import { useState, useRef } from 'react';

export function useSections() {
    const [sections, setSections] = useState([]);
    const [sectionErr, setSecErr] = useState(null);
    const cache = useRef(null);

    const fetchSections = async(yearId, periodId, deptId) => {
        if (cache.current) cache.current.abort();
        cache.current = new AbortController();
        const signal = cache.current.signal;

        try{    
            const secReq = await fetch(`/api/sections`,{
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({yearId:yearId, periodId:periodId, deptId:deptId}),
                signal
            });

            const secRes = await secReq.json();

            if(secReq.ok && secRes.success){
                setSections(secRes.data ?? []);
                setSecErr(null);
            }else{ 
                setSecErr(secRes.message ?? 'Failed to fetch sections');
            }
        }catch(err){
            setSecErr(err.message);
            console.log('Something went wrong: ', err);
        }
    }
    return {sections, sectionErr, fetchSections};
}