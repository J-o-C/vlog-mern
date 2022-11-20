
function Compose (props) {

    const date = new Date();
    

    return (
        <div>

            <button className="add" onClick={props.changeDoRender}>Add</button>
            <h2 className="date">{date.toLocaleDateString() + " - " + date.toLocaleTimeString()}</h2>

            <textarea className="text-box"></textarea>
        </div>
    );
}

export default Compose;