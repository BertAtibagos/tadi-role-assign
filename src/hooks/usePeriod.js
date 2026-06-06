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
            } catch (prdErr) {
                setErr(prdErr.message);
                console.log('Something went wrong: ', prdErr);
            }
        }

        fetchPeriod();
    }, []);

    return { period, prdErr };

}