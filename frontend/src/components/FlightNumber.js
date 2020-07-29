import React from 'react'

const FlightNumber = (props) => {
  return (
    <div className="row-span-1 flex flex-col justify-center text-center italic text-gray-300 font-bold outlineText text-lg lg:text-3xl">
      {props.flight}
    </div>
  )
}

export default FlightNumber
