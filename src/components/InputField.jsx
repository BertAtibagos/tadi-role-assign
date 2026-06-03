export default function InputFieldComp(prop){
    const {style, text} = prop;
    return(
        <input className={ style } placeholder={ text }/>
    );
}