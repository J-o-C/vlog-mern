import {useState, useRef} from "react";

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

            <button className="add" onClick={() => {props.addEntry(data)}}>Add</button>
            <h2 className="date">{date.current.toLocaleDateString() + " - " + date.current.toLocaleTimeString()}</h2>

            <textarea onChange={handleChange} value={text} name="text" className="text-box"></textarea>
        </div>
    );
}

export default Compose;