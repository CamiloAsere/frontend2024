import React from 'react'
import ThisButton from '../components/ButtonComponent'
import { Outlet } from 'react-router-dom'

export default function Astro() {
  return (
    <div className='container'>
    <h2 style={{color:'white'}}>Astro</h2>
    <ThisButton >xwsws</ThisButton>
    <Outlet/>
    </div>
  )
}
