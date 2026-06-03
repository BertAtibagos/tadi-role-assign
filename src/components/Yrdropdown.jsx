import { useState, useEffect } from 'react';

export default function DropdownComp(prop) {
    const { style } = prop;
    const [years, setYears] = useState([]);
    const [err, setErr] = useState(null);

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
            } catch (error) {
                setErr(error.message);
                console.log('Something went wrong: ', error);
            }
        }

        fetchYears();
    }, []);

    return (
        <>
            <select className={style}>
                {years.map((item) => (
                    <option key={item.yrId} value={item.yrId}>
                        {item.yrName}
                    </option>
                ))}
            </select>
            {err ? <div>{err}</div> : null}
        </>
    );
}