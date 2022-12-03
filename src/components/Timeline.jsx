import React, {useEffect, useRef, useState} from "react";
import { Link } from "react-router-dom";
import Entry from "./Entry";


function Timeline(props) {
    const [countEntries, setCountEntries] = useState(0);
    const [entriesArray, setEntriesArray] = useState([]);
    const [dataReady, setDataReady] = useState(false);

    useEffect(() => {
        fetch("http://localhost:5000/entries")
        .then(response => response.json())
        .then(data => {
            setEntriesArray(data.entries);
            setCountEntries(data.count);
            setDataReady(true);
        })

    }, []);

    function loadMore() {
        setDataReady(false);
        fetch("http://localhost:5000/entries", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({length: entriesArray.length})
        })
        .then(response => response.json())
        .then(data => {
            setEntriesArray(prevValues => {
                return [...prevValues, ...data];
            })
            setDataReady(true);
        });

        
    }


   return (
    <>
    <div className="content">
        <h1>Entries</h1>
        {entriesArray.map((entry) => <Link key={entry._id} to={"timeline/" + entry._id}> <Entry key={entry._id} id={entry._id} date={entry.date} text={entry.content} /> </Link> )}
        
        {dataReady && (entriesArray.length < countEntries) ? <button onClick={loadMore} className="load-more">Load more</button> : null}
        {dataReady ? null : <div className="loading"></div>}
        
    </div>

    <Link className="compose" to="/compose">+ New</Link>
    </>
   )
}

export default Timeline;