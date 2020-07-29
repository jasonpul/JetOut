import React from 'react'


const PriceJumbotron = (props) => {
  let farePrice = props.fareObj[0]
  let cityNames = props.fareObj[1].map((fare) => {
    return fare.destinationName
  })
  let imageUrls = props.fareObj[1].map((fare) => {
    return fare.imageUrl1
  })
  let destinations
  cityNames.length > 1 ? destinations = cityNames.join(', ') : destinations = cityNames[0]
  let imageUrl
  imageUrl = imageUrls[Math.floor(Math.random() * imageUrls.length)]
  
  return (
    <div className="relative" style={{cursor: 'pointer'}} onClick={() => {props.onClick(props.fareObj[1])}}>
      <div className="relative flex h-48 w-full mx-auto rounded-lg bg-gray-800 shadow-xl border-2 border-gray-700">
        <div className="relative flex flex-col justify-center text-center text-gray-300 italic font-bold outlineText w-1/3 h-full bg-gray-800 rounded-l-lg text-5xl lg:w-1/4 ">
          ${farePrice}
        </div>
        <div 
          className="relative flex flex-col justify-center text-center text-gray-300 italic font-bold outlineText w-2/3 h-full bg-gray-300 rounded-r-lg overflow-hidden  bg-cover text-3xl lg:text-5xl lg:w-3/4"
          style={{backgroundImage: `url(${imageUrl})`, backgroundPosition: 'center'}}
        >
          {destinations}
        </div>
      </div>
    </div>
  )
}

export default PriceJumbotron
