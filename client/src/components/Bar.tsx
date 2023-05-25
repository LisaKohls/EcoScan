import React from 'react'
import {Values} from "../containers/protectedPage/ProductInfoProps";

const Bar: React.FC<Values> = props => {

    const barStyles = {
        width: `${props.index}%`,
        backgroundColor: props.index >= 70 ? 'rgb(101 163 13)' : props.index >= 40 ? 'rgb(252 211 77)' : 'rgb(251 146 60)',
    };

    return(
        <div className="h-4 bg-gray-300 w-400 m-10 rounded">
            <div className="h-full rounded" style={barStyles}></div>
            <p>{props.title}</p>
        </div>
    )
}

export default Bar