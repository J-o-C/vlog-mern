import React, {useEffect, useRef, useState} from "react";
import { Link } from "react-router-dom";
import Entry from "./Entry";


function Timeline(props) {
    const entriesArray = useRef({current: []}); 
    const [dataReady, setDataReady] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5000/entries")
        .then(response => response.json())
        .then(data => {
            entriesArray.current = data;
            setDataReady(true);
        })

    }, []);


   return (
    <>
    <div className="content">
        <h1>Entries</h1>
        {dataReady ? entriesArray.current.map((entry) => <Link key={entry._id} to={"timeline/" + entry._id}> <Entry key={entry._id} id={entry._id} date={entry.date} text={entry.content} /> </Link> ) : <div className="loading"></div>}
        
    </div>

    <Link className="compose" to="/compose">+ New</Link>
    {/* <button className="compose">+ New</button> */}
    </>
   )
}

export default Timeline;