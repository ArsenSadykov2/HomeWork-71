import {NavLink} from "react-router-dom";


const ToolBarAdmin = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <NavLink to='/' className="navbar-brand">Turtle Pizza Admin</NavLink>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink to='/' className="nav-link">Dishes</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/orders' className="nav-link">Orders</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to='/new-dish' className="nav-link">Add New Dish</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default ToolBarAdmin;