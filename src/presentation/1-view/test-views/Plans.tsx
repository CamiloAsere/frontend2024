import React from 'react'
import { DataPlan } from './store'
type Props = {
dataPlan:DataPlan
}

const Plans:React.FC<Props> = ({dataPlan}) =>{
  return (
    <>
    <h1>Plans</h1>
    <ul>
    {
    dataPlan.map((data)=>{
    return ( 
    <li style={{color:"white",listStyle:"none",display:'flex',alignContent:"space-between",alignItems:"center",textAlign:"center"}} key={data.name}>
    <p> name: {data.name}</p>
    <p> Total {data.quota}</p>
    <p> data Used {data.dataUsed}</p>
    </li>)
    }
    ) } 
    </ul>
    </>
  )
}

export default Plans