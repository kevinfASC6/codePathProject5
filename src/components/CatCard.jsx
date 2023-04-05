import React from "react";   

const CatCard = (props) => { 
    return(
        <div className="card">
            <h2>{props.descrip1}</h2> 
            <h3>{props.descrip2}</h3>
        </div>
    )
} 

export default CatCard; 