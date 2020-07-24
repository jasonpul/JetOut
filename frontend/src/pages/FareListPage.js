import React from 'react'
import FaresAPI from '../API/FaresAPI'
import PriceJumbotron from '../components/PriceJumbotron'
import DestinationSearch from '../components/DestinationSearch'

const FareListPage = () => {

  const [isLoading, setIsLoading] = React.useState(true)
  const [fares, setFares] = React.useState([])

  const getFares = async () => {
    let searchObj = {
      origin: 'LAX',
      departureDate: '2020-07-25',
      returnDate: '2020-08-08',
      destinationFilter: 'domestic',
      minFare: 0,
    }
    let response = await FaresAPI.getFares(searchObj)
    let responseJson = await response.json()
    setIsLoading(false)
    setFares(responseJson.fares)
    // console.log(responseJson.fares)
    
  }

  React.useEffect(() => {
    getFares()
  }, [])

  const handleClick = (id) => {
    console.log(id)
  }

  return (

    <div>
      {/* <PriceJumbotron /> */}
      {/* {!isLoading && fares.length === 0 && <h1 className="text-5xl text-center mx-auto mt-32">No Fares Found</h1> } */}

      {/* {isLoading ? <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1> : <h1 className="text-6xl text-center mx-auto mt-32"> Done Loading</h1>} */}
      <DestinationSearch />
      {isLoading 
        ? <h1 className="text-6xl text-center mx-auto mt-32">Loading...</h1>
        : <div className="grid grid-cols-1 gap-12">{fares.map((fare, i) => (
            <PriceJumbotron 
              key={i} 
              fareObj={fare} 
              id={fare[1][0].id}
              onClick={handleClick}
            />))}
          </div>
      }
    </div>
  )
}

export default FareListPage
