import { useEffect, useState, useRef } from "react";
import { Link, useParams, redirect, useNavigate } from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';


function Single(props) {
    let { id } = useParams();
    const [dataReady, setDataReady] = useState(false);
    const navigate = useNavigate();

    let entry = useRef();
    useEffect(() => {
        fetch("http://localhost:5000/single/" + id)
        .then(response => response.json())
        .then(data => {
            entry.current = data[0];
            setDataReady(true);
        })
    }, []);

    function deleteEntry(id) {

        fetch("http://localhost:5000/delete", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({id: id})
        })
        .then(response => response.json())
        .then(data => {
            navigate("/");
        });
        
    }

    
    return (
    <>
        <div className="single">
            <div className="single-header">
                <div>
                    <Link to="/"> <button className="arrow"> <ArrowBackIcon /> </button> </Link>
                    {dataReady ? <h2>{entry.current.date}</h2> : null}
                </div>

                <button className="delete" onClick={() => {deleteEntry(id)}}> <DeleteIcon /> </button>
                
            </div>
            
            <div className="single-paragraph">
                {dataReady ? <p>{entry.current.content}</p> : <div className="loading"></div>}
            </div>
        </div>
    </>
    )
}

export default Single;