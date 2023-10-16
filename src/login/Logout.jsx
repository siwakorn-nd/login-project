import { useNavigate } from 'react-router-dom';

const HandleLogout = () => {
const navigate = useNavigate();

   const handleLogout = () => {
        localStorage.removeItem('jwtToken');

        alert('Logged out successfully');

        navigate('/login');
    }

    return (
        <>
        <button
        className='btn btn-error normal-case text-xl text-white'
        onClick={handleLogout}>Logout</button>
        </>
    );
};

export default HandleLogout;