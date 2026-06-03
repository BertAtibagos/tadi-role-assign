import { useState, useEffect } from 'react';

export default function PrddropdownComp(prop) {
    const { style } = prop;
    const [period, setPeriod] = useState([]);
    const [err, setErr] = useState(null);

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
            } catch (error) {
                setErr(error.message);
                console.log('Something went wrong: ', error);
            }
        }

        fetchPeriod();
    }, []);

    return (
        <>
            <select className={style}>
                {period.map((item) => (
                    <option key={item.prdId} value={item.prdId}>
                        {item.prdName}
                    </option>
                ))}
            </select>
            {err ? <div>{err}</div> : null}
        </>
    );
}
