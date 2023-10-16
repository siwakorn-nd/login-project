import axios from "axios";
import Navbar from "../navbar/Navbar.jsx";
import { useState } from "react";

const RegisterForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const createData = async (username, password) => {
        try {
            const response = await axios.post('https://earth-testapi-new-com.onrender.com/register', {
                username: username,
                password: password
            }, { 
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            if (response.status === 200) {
                alert('Register success');
                window.location.reload();
            }
        } catch (error) {
            if (error.response.status === 401) {
                alert('Please use another username');
            }
            console.error('Error:', error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (username.trim() === '' || password.trim() === '') {
            alert('Please fill in all fields');
            return;
        } else if (password.length < 8) {
            alert('Password must be at least 8 characters');
            return;
        } else if (password.length > 16) {
            alert('Password must be less than 16 characters');
            return;
        } else if (username.length < 6) {
            alert('Username must be at least 6 characters');
            return;
        } else if (username.length > 16) {
            alert('Username must be less than 16 characters');
            return;
        } else if (username.includes(' ')) {
            alert('Username must not contain spaces');
            return;
        } else if (password.includes(' ')) {
            alert('Password must not contain spaces');
            return;
        } else {
        createData(username, password);
        }
    }
    
    return (
        <>
        <Navbar />
        <div className='flex h-[80vh] justify-center items-center text-base'>
            <form 
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 w-[90%] lg:w-[50%] h-[50vh] justify-center items-center bg-base-300 rounded-xl"
            > {/* Use onSubmit to handle form submission */}
                <p className="text-2xl">Register</p>
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
                <button type="submit" className='btn btn-primary'>Submit</button> {/* Change type to "submit" */}
            </form>
        </div>
        </>
    );
};

export default RegisterForm;
