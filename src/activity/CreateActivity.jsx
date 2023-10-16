/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavbarLoggedIn from '../navbar/NavbarLogedin';

const CreateActivity = () => {
    const [activityType, setActivityType] = useState('');
    const [activityName, setActivityName] = useState('');
    const [activityDescription, setActivityDescription] = useState('');
    const [activityDuration, setActivityDuration] = useState('');
    const [activityDate, setActivityDate] = useState('');
    const [activityImage, setActivityImage] = useState('');
    const [userData , setUserData] = useState('')
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('jwtToken');
        if (token) {
            axios.get('https://earth-testapi-new-com.onrender.com/user', {
                headers: {
                    Authorization: token,
                    'x-auth-token': token,
                },
            })
                .then((response) => {
                    if (response.status === 200) {
                        setUserData(response.data);

                        setUserId(response.data._id)
                    } else {
                        console.error('Failed to fetch user data');
                    }
                })
                .catch((error) => {
                    console.error('Error fetching user data from the backend:', error);
                });
        }
    }, []);

    const CreateActivityMethod = async () => {
        try {
            if (!userId) {
                console.error('User ID not available');
                return;
            }

            const response = await axios.post('https://earth-testapi-new-com.onrender.com/activities', {
                activity_type: activityType,
                activity_name: activityName,
                activity_description: activityDescription,
                duration: activityDuration,
                date: activityDate,
                image: activityImage, 
                userId: userId, 
            }, {
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            if (response.status === 201) { 
                alert('Activity Created');
                setActivityType('');
                setActivityName('');
                setActivityDescription('');
                setActivityDuration('');
                setActivityDate('');
                setActivityImage('');
            } else {
                alert('Activity Creation failed');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        CreateActivityMethod();
    }

    return (
        <>
        <NavbarLoggedIn />
        <div className='flex flex-col h-[80vh] justify-center items-center'>
            <form 
            className='flex flex-col w-[90%] lg:w-[40%] h-[60vh] bg-base-300 items-center p-4 rounded-xl'
            onSubmit={handleSubmit}>
                {/* Input fields here */}
                <p className='text-xl my-4'>Create Activity</p>
                <input 
                type="text"
                placeholder="Activity Type"
                value={activityType}
                onChange={(e) => setActivityType(e.target.value)}
                className='input input-bordered w-full max-w-xs my-2'
                />
                <input 
                type="text"
                placeholder="Activity Name"
                value={activityName}
                onChange={(e) => setActivityName(e.target.value)}
                className='input input-bordered w-full max-w-xs  my-2'
                />
                <input 
                type="text"
                placeholder="Activity Description"
                value={activityDescription}
                onChange={(e) => setActivityDescription(e.target.value)}
                className='input input-bordered w-full max-w-xs my-2'
                />
                <input 
                type="number"
                placeholder="Activity Duration"
                value={activityDuration}
                onChange={(e) => setActivityDuration(e.target.value)}
                className='input input-bordered w-full max-w-xs  my-2'
                />
                <input 
                type="date"
                placeholder="Activity Date"
                value={activityDate}
                onChange={(e) => setActivityDate(e.target.value)}
                className='input input-bordered w-full max-w-xs  my-2'
                />
                <input 
                type="text"
                placeholder="Activity Image"
                value={activityImage}
                onChange={(e) => setActivityImage(e.target.value)}
                className='input input-bordered w-full max-w-xs  my-2'
                />
                <button 
                type='submit'
                className='btn btn-primary  my-2'>
                    Create
                </button>
            </form>

        </div>
        </>
    );
};

export default CreateActivity;
