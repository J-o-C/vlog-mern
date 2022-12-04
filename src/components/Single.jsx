import { useEffect, useState, useRef } from "react";
import { Link, useParams} from "react-router-dom";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import DeleteIcon from '@mui/icons-material/Delete';



function Single(props) {
    let { id } = useParams();
    const [dataReady, setDataReady] = useState(false);
    const [hideClass, setHideClass] = useState("confirmation-hide");

    let entry = useRef();
    useEffect(() => {
        fetch("http://localhost:5000/single/" + id)
        .then(response => response.json())
        .then(data => {
            entry.current = data[0];
            setDataReady(true);
            props.setMessage();
        })
    }, []);



    function toggleClass() {
        hideClass ? setHideClass() : setHideClass("confirmation-hide");
    }

    
    return (
    <>
        <div className="single">
            <div className="single-header">
                <div>
                    <Link to="/"> <button className="arrow"> <ArrowBackIcon /> </button> </Link>
                    {dataReady ? <h2>{entry.current.date}</h2> : null}
                </div>

                <div>
                    <button className="delete" onClick={toggleClass}> <DeleteIcon /> </button>
                    <div className={"confirmation " + hideClass}>
                        <p>Do you want to delete?</p>
                        <div>
                            <Link to="/"> <button className="yes" onClick={() => {props.deleteEntry(id)}}>Yes</button> </Link>
                            <button className="no" onClick={toggleClass}>No</button>
                        </div>
                    </div>
                </div>
                
            </div>
            
            <div className="single-paragraph">
                {dataReady ? <p>{entry.current.content}</p> : <div className="loading"></div>}
            </div>


        </div>
    </>
    )
}

export default Single;