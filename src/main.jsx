import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

// Import your components
import RegisterForm from './login/Register.jsx'
import Home from './Home.jsx'
import Login from './login/Login.jsx';
import App from './App.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'
import CreateActivity from './activity/CreateActivity.jsx';
import ActivityCard from './activity/ActivityCard.jsx';

const routes = createBrowserRouter(
  [
    {
      path: "/", // this is the URL path
      element: <App />
    },
    {
      path: "/register",
      element: <RegisterForm />
    },
    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/home", // Define a route for /user
      element: <ProtectedRoute>
        <Home /> {/* Wrap it with ProtectedRoute */}
      </ProtectedRoute>
    },    
    {
      path: "/activity/form", // Define a route for /user
      element: <ProtectedRoute>
        <CreateActivity />
      </ProtectedRoute>
    },
    {
      path: "/activity", // Define a route for /user
      element: <ProtectedRoute>
        <ActivityCard />
      </ProtectedRoute>
    },
  ]
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={routes}/>
  </React.StrictMode>
);
