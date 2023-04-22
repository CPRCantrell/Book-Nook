import React, {useRef} from "react";
import "./Collapsible.css"

const Collapsible = ({show,children,horizontal=false}) => {

    const collapsRef = useRef()


    return (
        <div
        className='collaps-control'
        ref={collapsRef}
        style={{maxHeight: !show ? 0 : collapsRef.current.scrollHeight + 'px'}}>
            {children}
        </div>
    );
}

export default Collapsible;