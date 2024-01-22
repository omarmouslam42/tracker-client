import React from 'react'
import NavSide from "./NavSide"
import { Outlet } from 'react-router-dom'
import Orb from './Orb'
export default function Layout() {
    return (
        <div className='position-relative vh-100 '>
            <Orb />
            
            <div className='m-4 row z-3 position-absolute end-0 start-0  justify-content-center align-items-center'>
                <div className='col-3 '>
                    <NavSide />
                </div>


                <div className='col-9 '>
                    <div className='content vh-100  overflow-scroll rounded-4 p-3 border border-3 border-white container'>

                        <Outlet />
                    </div>
                </div>
            </div>


        </div>
    )
}
