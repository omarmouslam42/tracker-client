import React, { useContext, useEffect, useState } from 'react'
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css"
import { globalData } from '../context/GlobalContext'
import { ToastContainer, toast } from 'react-toastify';
import { dateForm } from '../utlis/dateForm';
export default function Expense() {
  const { addExpense, deleteExpense, getExpense, expenseData,totalExpense,setActive } = useContext(globalData)

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
  const { date, category, description,title,amount } = inputState

  const submit = (e) => {
    e.preventDefault();
    console.log(inputState);
    addExpense(inputState)
    setInputState({
      title: "",
      amount: "",
      date: "",
      category: "",
      description: ""
    })
  }


  const handelCategory = (ca) => {
    if (ca == "education") {
      return <i className="fa-solid fa-book-open-reader fs-2 p-2 m-2"></i>
    }
    else if (ca == "groceries") {
      return <i className="fa-solid fa-utensils fs-2 p-2 m-2"></i>
    }
    else if (ca == "health") {
      return <i className="fa-solid fa-notes-medical fs-2 p-2 m-2"></i>
    }
    else if (ca == "subscriptions") {
      return <i className="fa-solid fa-tv fs-2 p-2 m-2"></i>
    }
    else if (ca == "takeaways") {
      return <i className="fa-solid fa-plane-departure fs-2 p-2 m-2"></i>
    }
    else if (ca == "clothing") {
      return <i className="fa-solid fa-hat-cowboy fs-2 p-2 m-2"></i>
    }
    else if (ca == "travelling") {
      return <i className="fa-solid fa-earth-americas fs-2 p-2 m-2"></i>
    }
    else if (ca == "other") {
      return <i className="fa-solid fa-chart-simple fs-2 p-2 m-2"></i>
    }
  }
  useEffect(() => {
    getExpense()
    setActive("Expenses")
  }, [])
  return (
    <div>
      <div>
        <h3 className='text-black'>Expenses</h3>
      </div>
      <div className='total-ground border border-2 border-white shadow-sm mt-3 d-flex justify-content-center align-items-center rounded-4 py-2'>
        <h4>Total Expense: <span className='text-success'>${totalExpense()}</span> </h4>
      </div>
      <div className='row mt-3'>
        <div className='col-md-4'>
          <form onSubmit={submit}>
            <input onChange={handelInputs} value={title} className='shadow-sm border-white form-control bg-transparent ' type="text" placeholder='Expense Title' id="title" />
            <input onChange={handelInputs} value={amount} className='shadow-sm border-white form-control bg-transparent mt-3' type="number" placeholder='Expense Amount' id="amount" />
            <div className='  d-flex justify-content-start align-items-center mt-3'>
              <DatePicker onChange={(date) => {
                setInputState({ ...inputState, date: date })
              }} className=' bg-transparent border-white rounded shadow-sm' placeholder="Date" dateFormat="dd/MM/yyy" selected={date} id="date" />
              <label htmlFor='date' className='ms-3'>Date</label>
            </div>
            <div className='d-flex justify-content-end'>
              <div class="input-group mb-3 mt-3 w-50 ">
                <select className="form-select bg-transparent shadow-sm border-white" value={category} onChange={handelInputs} id="category">
                  <option >Select Option</option>
                  <option value="groceries">groceries</option>
                  <option value="education">education</option>
                  <option value="health">health</option>
                  <option value="subscriptions">subscriptions</option>
                  <option value="clothing">clothing</option>
                  <option value="takeaways">takeaways Transfer</option>
                  <option value="travelling">travelling</option>
                  <option value="other">other</option>
                </select>
              </div>
            </div>
            <textarea onChange={handelInputs} value={description} className='bg-transparent rounded border border-white border-3 shadow' placeholder='Add A Refrance' id="description" cols="36" rows="4"></textarea>
            <button type='submit' className='btn btn-danger mt-5 rounded-pill p-2'><i className="fa-solid fa-plus"></i> Add Income </button>
            <ToastContainer autoClose={4000} />
          </form>

        </div>
        <div className='col-md-8'>
          {expenseData?.map((result) => {
            return <div key={result._id} className='incomes  p-2 mb-2 border border-2 border-white shadow-sm rounded d-flex justify-content-start align-items-center gap-3'>
              <div className='logo border border-2 border-white rounded '>
                {/* <i className="fa-brands fa-bitcoin fs-2 p-2 m-2"></i> */}
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
              <div onClick={() => { deleteExpense(result?._id) }} className='bg-dark text-white p-1 px-2 rounded-circle' style={{ cursor: "pointer" }} ><i class="fa-solid fa-trash fa-sm"></i></div>
            </div>
          })
          }
          {!expenseData.length && <div className='d-flex justify-content-center align-items-center'>
            <h6 className='text-muted'>Expenses is Empty</h6>
          </div>}
 

        </div>
      </div>
    </div>
  )
}
