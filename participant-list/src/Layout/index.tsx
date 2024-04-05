import React from 'react';
import Navbar from '../Navbar';
import { Outlet } from 'react-router-dom';
import { Suspense } from "react";

const Layout = () => {
    return (
        <div className="App">
            <Navbar />
            <Suspense>
                <Outlet />
            </Suspense>
            
            {/* <ParticipantList participants={participants} sortFunction={sortFunction}/> */}
            {/* <ParticipantInfo participantName={"Jashwanth Kumar"} countOfCodes={2}/> */}
        </div>
    )
}

export default Layout;