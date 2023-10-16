import { useNavigate } from "react-router-dom";
import { useEffect } from "react"; // Import useEffect

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('jwtToken');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            navigate('/login');
        }
    }, [token, navigate]); 

    return children;
};

export default ProtectedRoute;
