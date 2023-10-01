import React from 'react'
import spinnerImage from './spinner.gif'
export default function Spinner() {
  return (
   <>
   <img style={{margin:"0px auto", height:"30vh"}} id='image1' src={spinnerImage} alt="loading" />
   </>
  )
}
