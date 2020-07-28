import React from 'react'
import FlightLeg from './FlightLeg'
import FlightNumber from './FlightNumber'

const DetailsJumbotron = (props) => {
  const {fare} = props
  // console.log(fare)
  const segments = fare.AirItinerary.OriginDestinationOptions.OriginDestinationOption
  const price = fare.AirItineraryPricingInfo.ItinTotalFare.TotalFare.Amount
  // segments.map((segment) => {
  //   console.log(segment)
  // })
  // console.log(segments)

  const legCount = segments.length

  return (
    <div className={`grid grid-rows-${legCount * 2} grid-cols-12 gap-0 mb-4 h-48 w-full mx-auto border-2 rounded-lg p-3`}>

      <div className={`row-span-${legCount * 2} col-span-3 grid grid-rows-${legCount} grid-cols-1 gap-0 h-full w-full mx-auto`}>
        {segments.map((segment, i) => {
          let flight = segment.FlightSegment[0].OperatingAirline
          return  <FlightNumber flight={`${flight.Code} ${flight.FlightNumber}`} key={i} />
        })}
      </div>
      <div className={`row-span-${legCount * 2} col-span-6 grid grid-rows-${legCount} grid-cols-6 gap-0 h-full w-full mx-auto`}>
        {segments.map((segment, i) => {
          let flightData = segment.FlightSegment[0]
          return <FlightLeg flightData={flightData} key={i} />
        })}
      </div>
      <div className={`row-span-${legCount * 2} col-span-3 grid grid-rows-${legCount} grid-cols-1 gap-0 h-full w-full mx-auto`}>
        <div className="row-span-2 text-center flex flex-col justify-center text-5xl italic ">
          {`$${price}`}
        </div>
      </div>
    </div>
  )
}

export default DetailsJumbotron
