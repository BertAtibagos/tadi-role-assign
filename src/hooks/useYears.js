import {useState, useEffect} from 'react';

export function useYears(){
    const [years, setYears] = useState([]);
    const [yrErr, setErr] = useState(null);

    useEffect(() => {
        async function fetchYears() {
            try {
                const yearsReq = await fetch('/api/years');
                const yearsRes = await yearsReq.json();

                if (yearsReq.ok && yearsRes.success) {
                    setYears(yearsRes.data ?? []);
                    setErr(null);
                } else {
                    setErr(yearsRes.message ?? 'Failed to fetch years');
                }
            } catch (err) {
                setErr(err.message);
                console.log('Something went wrong: ', err);
            }
        }

        fetchYears();
    }, []);

    return {years, yrErr};
}