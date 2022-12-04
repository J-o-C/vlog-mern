import {React ,useState, useRef} from "react";
import { Link } from "react-router-dom";
import AddSharpIcon from '@mui/icons-material/AddSharp';

function Compose (props) {
    const date = useRef(new Date());
    const [text, setText] = useState("");

    const data = {
        date: date.current.toLocaleDateString() + " - " + date.current.toLocaleTimeString(),
        text: text
        
    }

    function handleChange (event) {
        const value = event.target.value;
        setText(value)
    }


    return (
        <div>
            <Link to="/"> <button className="add" onClick={() => {props.addEntry(data)}}> <AddSharpIcon /> </button></Link>

            <h2 className="date">{date.current.toLocaleDateString() + " - " + date.current.toLocaleTimeString()}</h2>
            <textarea onChange={handleChange} value={text} name="text" className="text-box"></textarea>

        </div>
    );
}

export default Compose;