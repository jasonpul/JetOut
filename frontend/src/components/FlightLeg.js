import React from 'react'

const stripTime = (dateTime) => {
  return dateTime.split('T')[1].split(':').slice(0, 2).join(':')
}

const arrow = '✈'
const FlightLeg = (props) => {
  // console.log(props)
  return (
    <React.Fragment>
      <div className="col-start-1 col-span-2 h-10 text-right pr-2 flex flex-col justify-center pb-0 pt-4 lg:text-xl ">
        {stripTime(props.flightData.DepartureDateTime)}
      </div>
      <div className="col-start-3 col-span-2 h-10 text-center flex flex-col justify-center pb-0 pt-4">
        {/* <hr/> */}
        <div className='text-xl lg:text-5xl'>{arrow}</div>
      </div>
      <div className="col-start-5 col-span-2 h-10 text-left pl-2 flex flex-col justify-center pb-0 pt-4 lg:text-xl">
        {stripTime(props.flightData.ArrivalDateTime)}
      </div>
      <div className="col-start-1 col-span-2 h-8 mt-0 text-right pr-2 text-xs lg:text-md">
        {props.flightData.DepartureAirport.LocationCode}
      </div>
      <div className="col-start-3 col-span-2 h-8 mt-0 text-center text-xs lg:text-md">
        {`${props.flightData.ElapsedTime} min`}
      </div>
      <div className="col-start-5 col-span-2 h-8 mt-0 text-left pl-2 text-xs lg:text-md">
      {props.flightData.ArrivalAirport.LocationCode}
      </div>
    </React.Fragment>
  )
}

export default FlightLeg
