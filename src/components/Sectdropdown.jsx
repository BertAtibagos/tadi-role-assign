export default function DropdownComp(prop){
    const { section,
            sectionErr,
            style='', 
            className='',
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
    return(
        <div className="min-w-0">
            <select className={selectClasses} value={value} onChange={onChange} {...rest}>
                <option value="">Select Section</option>
                {section.map((item) => (
                    <option key={item} value={item}>
                        {item}
                    </option>
                ))}
            </select>
            {sectionErr ? <p className="mt-2 text-xs text-red-400">{sectionErr}</p> : null}
        </div>
    );
}