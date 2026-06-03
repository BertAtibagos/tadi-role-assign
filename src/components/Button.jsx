
export default function ButtonComp(prop){
    const {style, text} = prop;
    return(
        <button className={ style }>{ text }</button>
    );
}