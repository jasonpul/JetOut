import React from 'react'
import FaresAPI from '../API/FaresAPI'
import PriceJumbotron from '../components/PriceJumbotron'
import DestinationSearch from '../components/DestinationSearch'
import PageLoader from '../components/PageLoader'




const HomePage = () => {

  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    setIsLoading(false)
  }, [])

  return (

    <div>
      {
        isLoading
          ? <PageLoader />
          : <DestinationSearch /> 
      }
    </div>
  )
}

export default HomePage
