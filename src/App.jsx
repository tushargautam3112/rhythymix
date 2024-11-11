import './App.css'
import { createBrowserRouter, Link, RouterProvider } from 'react-router-dom';
import Home from './Routes/Home';
import Login from './Routes/Signup Pages/Login';
import ForgotPass from './Routes/Signup Pages/ForgotPass';
import Signup from './Routes/Signup Pages/Signup';
import { useState, useEffect, useContext } from 'react';
import ProfilePage from './Routes/ProfilePage';
import Preloader from './Components/Preloader';
import TracksPage from './Components/TracksPage';
import Modal from './Components/Modal';
import Interests from './Routes/Interests';
import Settings from './Routes/Settings';
import Navbar from './Components/Navbar';
import LikedSongs from './Routes/LikedSongs'
import SongHistory from './Routes/SongHistory';
// import ResetPass from './Components/ResetPass';
// import respas from './Components/respas';
import { UserProvider } from './Context/UserContext';
import { SearchProvider } from './Context/SearchedContext';
<<<<<<< HEAD
import PlaylistDetails from './Components/playlistByLink';
=======
import { PlayerContextProvider } from './Context/PlayerContext';
import PlaylistsPage from './Routes/PlaylistsPage';
>>>>>>> 67e2a54f (Fixed upload photo + playlist)

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/forgotpass",
    element: <ForgotPass />
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/signup/interests",
    element: <Interests />
  },
  {
    path: "/profile",
    element: <ProfilePage />
  },
  {
    path: "/likedsongs",
    element: <LikedSongs />
  },
  {
    path: "/songhistory",
    element: <SongHistory />
  },
  {
    path: "/resetpass/:token",
    element: <respas />
  },
  {
    path: "/modal",
    element: <Modal />
  },
  {
    path: "/interests",
    element: <Interests />
  },
  {
    path: "/settings",
    element: <Settings />
  },
  {
    path: "/playlist",
    element: <PlaylistsPage />
  }
  //,
  // {
  //   path: "/playlist/:playlistId",
  //   element: <PlaylistDetails/>
  // }
]);

function App() {
  // const {audioRef} = useContext(PlayerContext);
  
  return (
    <UserProvider>
      <SearchProvider>
        <PlayerContextProvider>

          <div className='App'>
            <RouterProvider router = {router} />
          </div>
        </PlayerContextProvider>
        
      </SearchProvider>
    </UserProvider>
  );
}

export default App
