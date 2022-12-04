import React, {useEffect, useRef, useState} from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Entry from "./Entry";

function Timeline(props) {
    const [countEntries, setCountEntries] = useState(0);
    const [entriesArray, setEntriesArray] = useState([]);
    const [dataReady, setDataReady] = useState(false);

    const toastParams = {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    };

    const notify = () => props.message.succeed ? toast.success(props.message.message, toastParams) : toast.error(props.message.message, toastParams);

    props.message && notify();

    useEffect(() => {
        fetch("http://localhost:5000/entries")
        .then(response => response.json())
        .then(data => {
            setEntriesArray(data.entries);
            setCountEntries(data.count);
            setDataReady(true);
            props.setMessage();
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

    <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
    />

    </>
   )
}

export default Timeline;