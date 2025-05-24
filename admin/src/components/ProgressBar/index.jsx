import React from 'react'

const ProgressBar = (props) => {
  return (
    <>
      <div className="overflow-hidden rounded-md w-[100px] h-auto bg-[#f1f1f1]">
      <div className={`flex items-center w-[${props.value}%] h-[8px] ${props.type==="success" && 'bg-green-500'}
      ${props.type==="error" && 'bg-pink-600'} ${props.type==="warning" && 'bg-orange-600'}
      `}>
       
      </div>
      </div>
    </>
  )
}

export default ProgressBar
