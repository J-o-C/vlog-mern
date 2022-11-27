

function Entry (props) {
    return (
        <div className="entry">
            <h3 className="date-entry"> {props.date} </h3>
            <p> {props.text} </p>
        </div>
    )
}

export default Entry;