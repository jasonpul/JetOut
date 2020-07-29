import React from 'react'
import DetailsJumbotron from '../components/DetailsJumbotron'


const FareDetailsPage = (props) => {
  const [noResults, setNoResults] = React.useState(false)
  props.setNavTitle('Flight Details')

  let fares = []
  let price
  if (!props.location.state) {
    props.history.push('/')
  } else {
    fares = props.location.state.response
    price = props.location.state.price
  }
  
  React.useEffect(() => {
    if (fares.length === 0) {
      setNoResults(true)
    } else {
      setNoResults(false)
    }
  }, [])
  
  return (
    <div>
      {noResults ? <div className='text-center text-6xl'>sorry, flights at the price are all booked up</div> : null}
      {fares.map((fare, i) => {
        return <DetailsJumbotron fare={fare} key={i} />
      })}
    </div>
  )
}

export default FareDetailsPage
