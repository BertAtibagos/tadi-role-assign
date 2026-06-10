export default function PrgdropdownComp(prop){
    const { program, 
            prgErr, 
            style = '', 
            className = '',
            value,
            onChange,
            ...rest } = prop;

    const selectClasses = [
        'h-11 w-full min-w-0 rounded-xl px-4 text-sm',
        'border border-white/10 bg-white/5 text-slate-100',
        'focus:outline-none focus:ring-2 focus:ring-blue-500/40',
        className,
        style,
    ]
        .filter(Boolean)
        .join(' ');
        
    return(
        <div className="min-w-0">
            <select className={selectClasses} value={value} onChange={onChange} {...rest}>
            {program.map((item, index) => (
                <option key={index} value={item}>
                    {item}
                </option>
            ))}
        </select>
        {prgErr ? <p className="mt-2 text-xs text-red-400">{prgErr}</p> : null}
        </div>
    );
}