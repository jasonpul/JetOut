import React from 'react'
import FaresAPI from '../API/FaresAPI'
import PriceJumbotron from '../components/PriceJumbotron'
import DestinationSearch from '../components/DestinationSearch'
import PageLoader from '../components/PageLoader'


const DateToString = (date) => {
  return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
}

const HomePage = (props) => {

  const [isLoading, setIsLoading] = React.useState(true)
  const [fares, setFares] = React.useState([])
  const [noResults, setNoResults] = React.useState(false)
  props.handleUpdateNavTitle('Search Flights')


  const getFares = async (airportCode, dateRange, travelFilter) => {
    let searchObj = {
      origin: airportCode,
      departureDate: DateToString(dateRange.from),
      returnDate: DateToString(dateRange.to),
      destinationFilter: travelFilter,
      minFare: 0,
    }
    setIsLoading(true)
    let response = await FaresAPI.getFares(searchObj)
    let responseJson = await response.json()
    setFares(responseJson.fares)
    setIsLoading(false)
    if (responseJson.fares.length === 0) {
      setNoResults(true)
    } else {
      setNoResults(false)
    }
    // (responseJson.fares.length === 0) ? setNoResults(true) : setNoResults(false)
  }

  const handleFareClick = async (faresObj) => {
    setIsLoading(true)
    let responseJsons = []
    for (let i = 0; i < faresObj.length; i++) {
      const detailObj = {
        price: faresObj[i].fullPrice,
        origin: faresObj[i].departureAirportCode,
        destination: faresObj[i].destinationAirportCode,
        departureDate: faresObj[i].departureTime,
        returnDate: faresObj[i].returnTime,
      }
      
      let response = await FaresAPI.getFareDetails(detailObj)
      let responseJson = await response.json()
      responseJsons = responseJsons.concat(responseJson.details)
      // console.log(responseJson.details)
    }
    // console.log(responseJsons)
    props.history.push('/details', {response: responseJsons, price: faresObj[0].fullPrice})
  }

  React.useEffect(() => {
    setIsLoading(false)
  }, [])

  return (

    <div>
      {
        isLoading
          ? <PageLoader />
          : (
              <div>
                <div className='w-full mx-auto italic text-right text-gray-300 text-sm lg:w-10/12'>16 day max allowable trip length</div>
                <DestinationSearch onSubmit={getFares} />
                {noResults ? <div className='text-center text-6xl'>sorry, no flights found</div> : null}
                <div className="grid grid-cols-1 gap-4 mb-4 lg:gap-12 lg:mb-12">
                {fares.map((fare, i) => {
                  return (
                    <PriceJumbotron 
                      key={i} 
                      fareObj={fare} 
                      id={fare[1][0].id}
                      onClick={handleFareClick}
                    />
                  )})}
              </div>
            </div>
            )
      }
    </div>
  )
}

export default HomePage
