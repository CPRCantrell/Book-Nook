import React, {useRef} from "react";
import "./Collapsible.css"

const Collapsible = (props) => {

    const collapsRef = useRef()
    const horizontal = props.horizontal || false


    return (
        <div
        className='collaps-control'
        ref={collapsRef}
        style={{maxHeight: !props.show ? 0 : collapsRef.current.scrollHeight + 'px'}}>
            {props.children}
        </div>
    );
}

export default Collapsible;