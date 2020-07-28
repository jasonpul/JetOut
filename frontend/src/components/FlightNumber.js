import React from 'react'

const FlightNumber = (props) => {
  return (
    <div className="row-span-1 flex flex-col justify-center text-center text-3xl italic">
      {props.flight}
    </div>
  )
}

export default FlightNumber
