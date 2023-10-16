import { useEffect, useState } from "react";
import axios from "axios";

const UserData = () => {
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        console.log(token);
        if (token) {
            axios.get('https://earth-testapi-new-com.onrender.com/user', {
                headers: {
                    Authorization: `${token}`,
                    'x-auth-token': token, 
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    setUserData(response.data);
                } else {
                    console.error('Failed to fetch user data');
                }
            })
            .catch((error) => {
                console.error('Error fetching user data from the backend:', error);
            });
        }
    }, []);

    return (
        <>
        <div className="user-data flex flex-col justify-center items-center">
            {userData ? (
                <div>
                    <h2 className="text-4xl">Welcome</h2>
                    <p className="text-xl">{userData.username}</p>

                    <a href="/activity/form"><button>Form</button></a>
                </div>
            ) : (
                <p>Loading user data...</p>
            )}
        </div>
        </>
    );
};

export default UserData;
