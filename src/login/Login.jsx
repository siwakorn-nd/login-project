import Navbar from "../navbar/Navbar";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => { 
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post('https://earth-testapi-new-com.onrender.com/login', {
                username: username,
                password: password
            }, { 
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 200) {
                alert('Login success');
                localStorage.setItem('jwtToken', response.data.accessToken);
                
                navigate('/home');
            }

        } catch (error) {
            if (error.response.status === 401) {
                alert('Invalid username or password');
            }
            console.error('Error:', error);
        }
    }
    
    return (
        <>
        <Navbar />
        <div className='flex h-[80vh] justify-center items-center'>
            <form 
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-[90%] lg:w-[50%] h-[50vh] justify-center items-center bg-base-300 rounded-xl"
            > {/* Use onSubmit to handle form submission */}
                <p className="text-2xl">Login</p>
                <label htmlFor="username">Username :</label>
                <input
                    type='text'
                    id='username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                />
                <label htmlFor="password">Password :</label>
                <input
                    type='password'
                    id='password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                />
                <button type="submit" className='btn btn-primary'>Submit</button>
            </form>
        </div>
        </>
    );
};

export default Login;
