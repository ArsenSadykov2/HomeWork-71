import {NavLink} from "react-router-dom";


const ToolBarClient = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <NavLink to='/' className="navbar-brand">Turtle Pizza Service</NavLink>
            </div>
        </nav>
    );
};

export default ToolBarClient;