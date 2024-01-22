import React, { useContext, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { globalData } from '../context/GlobalContext'
import { ToastContainer, toast } from 'react-toastify';
import { dateForm } from '../utlis/dateForm';
export default function Income() {
  const { addIncome, getIncome, incomesData, deleteIncome, totalIncomes, setActive } = useContext(globalData)
  
  const [inputState, setInputState] = useState({
    title: "",
    amount: "",
    date: "",
    category: "",
    description: ""
  })
  function handelInputs(e) {
    let newData = { ...inputState };
    let inputValue = e.target.value;
    newData[e?.target.id] = inputValue;
    setInputState(newData);
  }

  const submit = (e) => {
    e.preventDefault();
    console.log(inputState);
    addIncome(inputState)
    setInputState({
      title: "",
      amount: "",
      date: "",
      category: "",
      description: ""
    })
  }
  const {title,amount, date, category, description } = inputState

  const handelCategory = (ca) => {
    if (ca == "salary") {
      return <i class="fa-solid fa-money-bill-wave fs-2 p-2 m-2"></i>
    }
    else if (ca == "Bitcoin") {
      return <i class="fa-brands fa-bitcoin fs-2 p-2 m-2"></i>
    }
    else if (ca == "freelancing") {
      return <i class="fa-solid fa-briefcase fs-2 p-2 m-2"></i>
    }
    else if (ca == "investiments") {
      return <i class="fa-solid fa-users-between-lines fs-2 p-2 m-2"></i>
    }
    else if (ca == "stocks") {
      return <i class="fa-solid fa-money-bill-trend-up fs-2 p-2 m-2"></i>
    }
    else if (ca == "bank") {
      return <i class="fa-solid fa-building-columns fs-2 p-2 m-2"></i>
    }
    else if (ca == "youtube") {
      return <i class="fa-brands fa-youtube fs-2 p-2 m-2"></i>
    }
    else if (ca == "other") {
      return <i class="fa-solid fa-chart-simple fs-2 p-2 m-2"></i>
    }
  }

  useEffect(() => {
    getIncome()
    setActive("Income")
  }, [])

  return (
    <div>
      <div>
        <h3 className='text-black'>Incomes</h3>
      </div>
      <div className='total-ground border border-2 border-white shadow-sm mt-3 d-flex justify-content-center align-items-center rounded-4 py-2'>
        <h4>Total Income: <span className='text-success'>${totalIncomes()}</span> </h4>
      </div>
      <div className='row mt-3 flex-wrap'>
        <div className=' col-md-4'>
          <form onSubmit={submit}>
            <input onChange={handelInputs} value={title} className='shadow-sm border-white form-control bg-transparent ' type="text" placeholder='Add new item' id="title" />
            <input onChange={handelInputs} value={amount} className='shadow-sm border-white form-control bg-transparent mt-3' type="number" placeholder='amount' id="amount" />
            <div className='  d-flex justify-content-start align-items-center mt-3'>
              <DatePicker onChange={(date) => {
                setInputState({ ...inputState, date: date })
              }} className=' bg-transparent border-white rounded shadow-sm' placeholder="Date" dateFormat="dd/MM/yyy" selected={date} id="date" />
              <label htmlFor='date' className='ms-3'>Date</label>
            </div>
            <div className='d-flex justify-content-end'>
              <div class="input-group mb-3 mt-3 w-50 ">
                <select className="form-select bg-transparent shadow-sm border-white" value={category} onChange={handelInputs} id="category">
                  <option defaultValue={"Select Option"}>Select Option</option>
                  <option value="salary">salary</option>
                  <option value="Bitcoin">Bitcoin</option>
                  <option value="freelancing">freelancing</option>
                  <option value="investiments">investiments</option>
                  <option value="stocks">stocks</option>
                  <option value="bank">bank Transfer</option>
                  <option value="youtube">youtube</option>
                  <option value="other">other</option>
                </select>
              </div>
            </div>
            <textarea onChange={handelInputs} value={description} className='bg-transparent rounded border border-white border-3 shadow' placeholder='description' id="description" cols="36" rows="4"></textarea>
            <button type='submit' className='btn btn-danger mt-5 rounded-pill p-2'><i className="fa-solid fa-plus"></i> Add Income </button>
            <ToastContainer autoClose={4000} />
          </form>

        </div>
        <div className=' col-md-8 mt-2'>
          {incomesData?.map((result) => {
            return <div key={result._id} className='incomes  p-2 mb-2 border border-2 border-white shadow-sm rounded d-flex justify-content-start align-items-center gap-3'>
              <div className='logo border border-2 border-white rounded '>
                {handelCategory(result?.category)}
              </div>
              <div className='flex-fill'>
                <h6> <i className="fa-solid  fa-circle fa-2xs" style={{ color: '#1db420' }}></i> {result?.title}</h6>
                <div className='d-flex justify-content-start gap-4 align-items-center'>
                  <span><i className="fa-solid fa-dollar-sign fa-sm"></i> {result?.amount}</span>
                  <span><i className="fa-solid fa-calendar fa-sm"></i> {dateForm(result?.date)}</span>
                  <span><i className="fa-solid fa-comment fa-sm"></i> {result?.description}</span>
                </div>
              </div>
              <div onClick={() => { deleteIncome(result?._id) }} className='bg-dark text-white p-1 px-2 rounded-circle' style={{ cursor: "pointer" }} ><i className="fa-solid fa-trash fa-sm"></i></div>
            </div>
          })
          }
          {!incomesData.length && <div className='d-flex justify-content-center align-items-center'>
            <h6 className='text-muted'>Incomes is Empty</h6>
          </div>}


         
        </div>
      </div>
    </div>
  )
}
