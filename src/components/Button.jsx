
export default function ButtonComp(props) {
    const { style = '', className = '', text, ...rest } = props;

    const classes = [
        'inline-flex h-11 select-none items-center justify-center rounded-xl px-4 text-sm font-medium',
        'border border-white/10 bg-white/5 text-slate-100',
        'hover:bg-white/10',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className,
        style,
    ]
        .filter(Boolean)
        .join(' ');

    return (
        <button type="button" className={classes} {...rest}>
            {text}
        </button>
    );
}