import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { globalData } from '../context/GlobalContext';

export default function NavSide() {
  const { active, setActive } = useContext(globalData)
  return (
    <div className=' nav-side1  rounded-4 border border-3 mb-3 border-white  shadow-sm'>
      <div className='vh-100  p-3 position-relative'>

        <div className='row justify-content-start align-items-start '>
          <div className=' col-md-4 col-xs-4'>
            <div className=' '>
              <img src="images.png" className='w-100 rounded-circle border border-2 border-white' alt="avatar" />
            </div>
          </div>
          <div className='col-sm-8'>
            <div>
              <h5>Omar</h5>
              <p className='text-muted fs-6 fw-medium'>Your Money</p>
            </div>
          </div>
        </div>

        <div className='mt-5  d-flex justify-content-center align-items-start'>
          <ul className=''>
            <li className={`${active == "dashboard" ? 'active' : ''} `}> <i className="fa-solid fa-chart-line   m-2"></i> <Link onClick={() => { setActive("dashboard") }} to={"/dashboard"}>Dashboard</Link> </li>
            <li className={`${active == "Transactions" ? 'active' : ''} mt-3`}> <i className="fa-solid fa-credit-card  m-2"></i><Link onClick={() => { setActive("Transactions") }} to={"/dashboard"}>View Transactions</Link></li>
            <li className={`${active == "Income" ? 'active' : ''} mt-3`}> <i className="fa-solid fa-money-bill-trend-up  m-2"></i> <Link onClick={() => { setActive("Income") }} to={"/income"}>Income</Link></li>
            <li className={`${active == "Expenses" ? 'active' : ''} mt-3`}> <i className="fa-solid fa-money-bill-transfer  m-2"></i> <Link onClick={() => { setActive("Expenses") }} to={"/Expense"}>Expense</Link></li>
          </ul>
        </div>

        <div className='position-absolute bottom-0'>
          <h6 style={{ cursor: "pointer" }}> <i className="fa-solid fa-right-from-bracket me-2"></i>sign Out</h6>
        </div>
      </div>
    </div>
  )
}
