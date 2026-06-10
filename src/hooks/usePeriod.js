import { useState, useEffect } from 'react';

export function usePeriod() {
    const [period, setPeriod] = useState([]);
    const [prdErr, setErr] = useState(null);

    useEffect(() => {
        async function fetchPeriod() {
            try {
                const prdReq = await fetch('/api/period');
                const prdRes = await prdReq.json();

                if (prdReq.ok && prdRes.success) {
                    setPeriod(prdRes.data ?? []);
                    setErr(null);
                } else {
                    setErr(prdRes.message ?? 'Failed to fetch periods');
                }
            } catch (err) {
                setErr(err.message);
                console.log('Something went wrong: ', err);
            }
        }
        fetchPeriod();
    }, []);
    return { period, prdErr };
}