import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';

export const globalData = createContext()

function GlobalContext({ children }) {
    const baseUrl = "https://tracker-back.vercel.app"
    const closeAfter7 = () => toast.success("Done", { autoClose: 2000 });
    const [incomesData, setIncomesData] = useState([])
    const [expenseData, setExpenseData] = useState([])
    const[active,setActive]=useState("");

    ///////////////////  add income
    const addIncome = async (details) => {
        try {
            const { data } = await axios.post(`${baseUrl}/income/addIncome`, details)
            if (data.message == "done") {
                // console.log(data);
                closeAfter7()
                getIncome()
            }
        } catch (error) {
            // console.log(error.message);
        }
    }

    ////////////////// get income
    const getIncome = async () => {
        try {
            const { data } = await axios.get(`${baseUrl}/income/Incomes`)
            if (data.message == "done") {
                // console.log(data.incomes);
                setIncomesData(data.incomes)
                
            }
        } catch (error) {
            // console.log(error.message);
        }
    }

    //////////////// delete income 
    const deleteIncome = async (id) => {
        try {
            const { data } = await axios.delete(`${baseUrl}/income/deleteIncome/${id}`)
            if (data.message == "done") {
                // console.log(data.incomes);
                getIncome()
            }
        } catch (error) {
            // console.log(error.message);
        }
    }

    ///////////////  Expense
    ///////////////////  add expense
    const addExpense = async (details) => {
        try {
            const { data } = await axios.post(`${baseUrl}/Expense/addExpense`, details)
            if (data.message == "done") {
                // console.log(data);
                closeAfter7()
                getExpense()
            }
        } catch (error) {
            // console.log(error.message);
        }
    }

    ////////////////// get expense
    const getExpense = async () => {
        try {
            const { data } = await axios.get(`${baseUrl}/Expense/Expenses`)
            if (data.message == "done") {
                setExpenseData(data.Expenses)
            }
        } catch (error) {
            // console.log(error.message);
        }
    }

    //////////////// delete expense 
    const deleteExpense = async (id) => {
        try {
            const { data } = await axios.delete(`${baseUrl}/Expense/deleteExpense/${id}`)
            if (data.message == "done") {
                getExpense()
            }
        } catch (error) {
            // console.log(error.message);
        }
    }

    const totalIncomes = () => {
        let total=0;
       incomesData.forEach(item => {
        total += item.amount
       });
       return total
    }

    //////////// total Expenses
  const totalExpense = () => {
    let total = 0;
    expenseData?.forEach(item => {
      total += item.amount
    });
    return total
  }

  const balance =()=>{
    return totalIncomes() - totalExpense()
  }

  const transactionHistory =()=>{
    const history = [...incomesData , ...expenseData]
     history.sort((a,b)=>{
        return new Date(b.createdAt) - new Date(a.createdAt)
    })
    // console.log( history.slice(0,3));
    return history.slice(0,3)
  }



    return <globalData.Provider value={{
        active,setActive,
        addIncome, incomesData, getIncome, deleteIncome,
        addExpense,deleteExpense,getExpense,expenseData,
        totalIncomes,totalExpense,balance,transactionHistory
    }}>
        {children}
    </globalData.Provider>
}
export default GlobalContext

