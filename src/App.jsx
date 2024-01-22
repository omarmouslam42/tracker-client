
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import Dashboard from './components/Dashboard'
import Income from './components/Income'
import Expense from './components/Expense'
import Transaction from './components/Transaction'


function App() {

  const router = createBrowserRouter([
    {path:"/" ,  element: <Layout /> , children:[
      {path:"/" , element:  <Dashboard/> },
      {path:"/Dashboard" , element:  <Dashboard/> },
      {path:"/transaction" , element:  <Transaction/> },
      {path:"/income" , element:  <Income/> },
      {path:"/Expense" , element:  <Expense/> },
    ]},
    ])
  return (
      <RouterProvider router={router}/>
    
  )

}

export default App
