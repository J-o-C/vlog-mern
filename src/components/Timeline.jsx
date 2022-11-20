import React from "react";


function Timeline(props) {
   return (
    <>
    <div className="content">
        <h1>Entries</h1>
    </div>

    <button className="compose" onClick={props.changeDoRender}>+ New</button>
    </>
   )
}

export default Timeline;