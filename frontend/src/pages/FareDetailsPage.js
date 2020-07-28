import React from 'react'
import DetailsJumbotron from '../components/DetailsJumbotron'





const FareDetailsPage = (props) => {
  const fares = props.location.state
  // console.log(fares)
  
  
  return (
    <div>
      {fares.map((fare, i) => {
        return <DetailsJumbotron fare={fare} key={i} />
      })}
    </div>
  )
}

export default FareDetailsPage
