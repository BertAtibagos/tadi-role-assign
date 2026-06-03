export default function PrgdropdownComp(prop){
    const {style, text} = prop;
    return(
        <select className={style}>
            {text.map((item, index) => (
                <option key={index} value={item}>
                    {item}
                </option>
            ))}
        </select>
    );
}