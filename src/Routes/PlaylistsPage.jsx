import Navbar from "../Components/Navbar";
import LeftSidebar from "../Components/LeftSidebar";
import RightSidebar from "../Components/RightSidebar";
import Preloader from "../Components/Preloader";
import { useState, useEffect } from "react";
import Controls from "../Components/Controls";
import ToastNotif from "../Components/SuccessMsg";
import TracksPage from "../Components/TracksPage";
import { useSearched } from "../Context/SearchedContext";
import CreatePlaylistForm from "../Components/CreatePlaylistForm";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link } from "react-router-dom";

export default function PlaylistsPage() {

  return (
    <>
    <div className="flex flex-col h-[90vh] ">
      <Navbar />
      <div className="flex flex-grow">
        <LeftSidebar />
        <div className="flex justify-center items-start flex-grow w-[100%] h-[100%] overflow-auto">
          <div className="middleCont w-[57%] h-[100%] flex flex-col rounded-xl bg-neutral-800 text-white p-4 shadow-xl shadow-blue-gray-900/5 z-5" style={{backgroundColor:"#1B0025"}}>
            
            <div className="banner flex h-[50%] w-full p-2 bg-clip rounded-t-xl justify-between" style={{backgroundColor:"#3e0652"}}>

             
              <div className="rightSide flex w-[100%] h-[65%] self-end gap-3 p-4 flex-col text-center">

                <h1>Playlist Name</h1>
                <span>Number of Songs</span>
              
              </div>

              
              <Menu as="div" className="" >
                <div>
                  <MenuButton>
                    <MoreHorizIcon />
                  </MenuButton>
                </div>
                <MenuItems transition className="
                absolute right-[22%] z-10  w-[190px] origin-top-right rounded-md bg-neutral-800 py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in">
            
                  <MenuItem className="block p-1 text-neutral-500 data-[focus]:bg-neutral-700">
                    <Link to="">Share Link</Link>
                  </MenuItem>
                </MenuItems>
              </Menu>
            </div>
          </div>
        </div>
        <RightSidebar />
      </div>
    </div>

    <ToastNotif />
    <Controls />


    </>
  );
}