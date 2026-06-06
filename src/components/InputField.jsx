export default function InputFieldComp(props) {
    const { style = '', className = '', text, ...rest } = props;

    const classes = [
        'h-11 w-full min-w-0 rounded-xl px-4 text-sm',
        'border border-white/10 bg-white/5 text-slate-100 placeholder:text-slate-400',
        'focus:outline-none focus:ring-2 focus:ring-blue-500/40',
        className,
        style,
    ]
        .filter(Boolean)
        .join(' ');

    return <input type="text" className={classes} placeholder={text} {...rest} />;
}