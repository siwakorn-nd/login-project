import { Link } from "react-router-dom";
import HandleLogout from "../login/Logout";

const NavbarLoggedIn = () => {
    return (
        <nav className="navbar bg-primary text-primary-content">
            <div className="navbar-start">
                <Link to="/home" className="btn btn-ghost normal-case text-xl text-white">
                    Home
                </Link>
            </div>
            <div className="navbar-end">
                <Link to="/activity" className="btn btn-ghost normal-case text-xl text-white">
                    Activity
                </Link>
                <HandleLogout />
            </div>
        </nav>
    );
};

export default NavbarLoggedIn;
