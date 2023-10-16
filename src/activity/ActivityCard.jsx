/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import axios from "axios";
import NavbarLoggedIn from "../navbar/NavbarLogedin";

const ActivityCard = () => {
  const [activities, setActivities] = useState([]);
  const [userData, setUserData] = useState("");
  const [userId, setUserId] = useState("");
  const [activityType, setActivityType] = useState("");
  const [activityName, setActivityName] = useState("");
  const [activityDescription, setActivityDescription] = useState("");
  const [activityDuration, setActivityDuration] = useState("");
  const [activityDate, setActivityDate] = useState("");
  const [activityImage, setActivityImage] = useState("");
  const [activityId, setActivityId] = useState("");

  const refreshPage = () => {
    window.location.reload(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      axios
        .get("https://earth-testapi-new-com.onrender.com/user", {
          headers: {
            Authorization: token,
            "x-auth-token": token,
          },
        })
        .then((response) => {
          if (response.status === 200) {
            setUserData(response.data);
            setUserId(response.data._id);
          } else {
            console.error("Failed to fetch user data");
          }
        })
        .catch((error) => {
          console.error("Error fetching user data from the backend:", error);
        });
    }
  }, []);

  useEffect(() => {
    const fetchUserActivities = async () => {
      try {
        const response = await axios.get(
          `https://earth-testapi-new-com.onrender.com/activities?userId=${userId}`
        );

        if (response.status === 200) {
          setActivities(response.data);
        } else {
          console.error("Failed to fetch activities");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchUserActivities();
  }, [userId]);

  const deleteData = async (_id) => {
    try {
      const response = await axios.delete(
        `https://earth-testapi-new-com.onrender.com/activities/${_id}`
      );
      if (response.status === 200) {
        alert("Activity deleted");
        refreshPage();
      } else {
        console.error("Failed to delete activity");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateData = async () => {
    try {
      const response = await axios.put(
        `https://earth-testapi-new-com.onrender.com/activities/${activityId}`,
        {
          _id: activityId,
          activity_type: activityType,
          activity_name: activityName,
          activity_describe: activityDescription,
          duration: activityDuration,
          date: activityDate,
        }
      );

      if (response.status === 200) {
        alert("Activity edited");
        refreshPage();
      } else {
        console.error("Failed to edit activity");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <NavbarLoggedIn />
      <div className="flex flex-col items-center">
        <h2 className="text-2xl my-8">User Activities</h2>
        <ul className="grid grid-col1">
          {activities.map((activity) => (
            <li
              key={activity._id}
              className="card w-96 bg-base-100 shadow-2xl p-4 my-4"
            >
              {activity.image ? (
                <figure>
                  <img
                    src={activity.image}
                    alt="Activity Image"
                    className="w-100px"
                  />
                </figure>
              ) : (
                <figure className="none"></figure>
              )}
              <div className="card-body">
              <p className="card-title">{activity.activity_name}</p>
              <p>Type: {activity.activity_type}</p>
              <p>Description: {activity.activity_describe}</p>
              <p>Duration: {activity.duration} minutes</p>
              <p>Date: {activity.date}</p>
              </div>
              <div className="card-actions justify-end">
                <button
                  className="btn btn-error my-2"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Are you sure you want to delete this activity?"
                      )
                    ) {
                      console.log(activity._id);
                      deleteData(activity._id);
                    }
                  }}
                >
                  Delete
                </button>
                <button
                  className="btn btn-primary my-2"
                  onClick={() => {
                    setActivityId(activity._id);
                    document.getElementById("my_modal_2").showModal();
                  }}
                >
                  Edit
                </button>
                <dialog id="my_modal_2" className="modal">
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">Edit Activity</h3>
                    <div>
                      <label htmlFor="activity_name">Activity Name:</label>
                      <input
                        type="text"
                        id="activity_name"
                        name="activity_name"
                        onChange={(ev) => setActivityName(ev.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="activity_type">Activity Type:</label>
                      <input
                        type="text"
                        id="activity_type"
                        name="activity_type"
                        onChange={(ev) => setActivityType(ev.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="activity_describe">
                        Activity Description:
                      </label>
                      <textarea
                        id="activity_describe"
                        name="activity_describe"
                        onChange={(ev) =>
                          setActivityDescription(ev.target.value)
                        }
                      />
                    </div>
                    <div>
                      <label htmlFor="duration">Duration (minutes):</label>
                      <input
                        type="number"
                        id="duration"
                        name="duration"
                        onChange={(ev) => setActivityDuration(ev.target.value)}
                      />
                    </div>
                    <div>
                      <label htmlFor="date">Date:</label>
                      <input
                        type="date"
                        id="date"
                        name="date"
                        onChange={(ev) => setActivityDate(ev.target.value)}
                      />
                    </div>
                    <div className="modal-actions">
                      <button
                        onClick={() =>
                          updateData(
                            activityId,
                            activityName,
                            activityType,
                            activityDescription,
                            activityDuration,
                            activityDate
                          )
                        }
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </dialog>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ActivityCard;
