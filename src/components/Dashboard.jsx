
import React, { useContext, useEffect } from 'react'
import Chart from './ChartModel'
import { globalData } from '../context/GlobalContext'

export default function Dashboard() {
  const { incomesData, getIncome, balance
    , totalIncomes, totalExpense, getExpense,
    transactionHistory, expenseData,setActive
  } = useContext(globalData)
  useEffect(() => {
    setActive("dashboard")
    getIncome()
    getExpense()
  }, [])

  return (
    <div>
      <h3 className='fw-semibold'>All Transactions</h3>
      <div className='row'>
        <div className='col-md-8 '>
          <div className='border border-2 border-white shadow-sm rounded '>
            <Chart />
          </div>
          <div className='d-flex justify-content-center align-items-center gap-4 mt-3 '>
            <div className='border border-2 border-white shadow-sm rounded-4 py-2 px-3'>
              <h5 className='fw-semibold'>Total Income</h5>
              <h2>$ {totalIncomes()}</h2>
            </div>
            <div className='border border-2 border-white shadow-sm rounded-4 py-2 px-3'>
              <h5 className='fw-semibold'>Total Expneses</h5>
              <h2>$ {totalExpense()}</h2>
            </div>

          </div>
          <div className='d-flex justify-content-center align-items-center mt-2'>
            <div className='balance border border-2 py-2 px-3 border-white shadow-sm rounded-4'>
              <h5>Total Balance</h5>
              <h2 className='text-success'>$ {balance()}</h2>
            </div>
          </div>

        </div>
        <div className='col-md-4'>
          <div className='mt-3'>
            <h5 className='fw-semibold mb-3'>Recent History</h5>
            {transactionHistory().map((item, idx) => {
              return <div key={idx} className={`${item.type== "income"?`text-success`:`text-danger`} d-flex justify-content-between align-items-center p-2 rounded-4 
              border border-2 border-white shadow-sm mb-2`}>
                <h6 >{item?.title}</h6>
                <span>${item.type=="Expense"?"-":"+"}{item?.amount}</span>
              </div>
            })}


            {/* salary */}
            <div className='salary mt-4'>
              <div className='d-flex justify-content-between align-items-center px-1'> <span className='fw-semibold'>Min</span> <h5 className='fw-bold'>Salary</h5> <span className='fw-semibold'>Max</span> </div>
              <div className='d-flex justify-content-between align-items-center p-2 rounded-4 
            border border-2 border-white shadow-sm'>
                <span>${Math.min(...incomesData.map(item=>item.amount))}</span>
                <span>${Math.max(...incomesData.map(item=>item.amount))}</span>
              </div>
            </div>
            {/* expenses */}
            <div className='expenses mt-4'>
              <div className='d-flex justify-content-between align-items-center px-1'> <span className='fw-semibold'>Min</span> <h5 className='fw-bold'>Expense</h5> <span className='fw-semibold'>Max</span> </div>
              <div className='d-flex justify-content-between align-items-center p-2 rounded-4 
            border border-2 border-white shadow-sm'>
                <span>${Math.min(...expenseData.map(item=>item.amount))}</span>
                <span>${Math.min(...expenseData.map(item=>item.amount))}</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
