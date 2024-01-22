import { ArcElement, CategoryScale, Chart, Legend, LineElement, LinearScale, PointElement, Title, Tooltip } from 'chart.js'
import React, { useContext } from 'react'
import { Line } from 'react-chartjs-2'
import { globalData } from '../context/GlobalContext'
import { dateForm } from '../utlis/dateForm'

Chart.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement
)

export default function ChartModel() {
    const {incomesData,expenseData}= useContext(globalData)
    // console.log(incomesData);
    const data = {
        labels: incomesData.map((item)=>{
            return dateForm(item.date)
        }),
        datasets:[
            {
                label:"Income",
                data:[
                    ...incomesData.map((inc)=>{
                        return inc.amount
                    })
                ],
                backgroundColor:"green",
                tension: 0.2
            },
            {
                label:"Expenses",
                data:[
                    ...expenseData.map((ex)=>{
                        return ex.amount
                    })
                ],
                backgroundColor:"red",
                tension: 0.2
            }
        ]
    }
    return (
        <div>
           <Line data={data} />
        </div>
    )
}
