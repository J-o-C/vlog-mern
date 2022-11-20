import React from "react";
import {Link} from "react-router-dom";
function Navigator() {
    return (
    <nav>
        <ul className="nav-options">
            <li>
                <Link className="nav-item active" to="/">Timeline</Link>
            </li>
            <li>
                <Link className="nav-item" to="/about">About us</Link>
            </li>
            <li>
                <Link className="nav-item" to="contact-us">Contact us</Link>
            </li>
    
        </ul>
    </nav>
    );
}

export default Navigator;