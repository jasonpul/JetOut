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
    <div className="relative" style={{cursor: 'pointer'}} onClick={() => {props.onClick(props.fareObj[1][0].id)}}>
      <div className="relative max-w-sm w-full lg:max-w-full lg:max-h-48 lg:flex mx-auto">
        <div className="relative flex-none h-48 rounded-t bg-cover text-center overflow-hidden lg:h-auto lg:w-1/3 lg:rounded-t-none lg:rounded-l" style={{backgroundImage: `url(${imageUrl})`}}>
          <div className="absolute bg-gray-300 opacity-75 h-full w-full rounded-t lg:rounded-t-none lg:rounded-l" />
          <span className="relative w-full h-full flex flex-col justify-center text-5xl italic" >${farePrice} Fares</span>
        </div>
        <div className="relative w-full h-48 border-l border-r border-b border-gray-400 bg-white rounded-b p-4 flex flex-col justify-between leading-normal lg:border-l-0 lg:border-t lg:border-gray-400 lg:rounded-b-none lg:rounded-r" >
          {/* <Resizable defaultSize={{width:'100%',height: '100%'}} style={resizeStyle} className='relative'>
            <div style={{padding: 0, width: '100%', height: '100%', userSelect: 'none'}} className=' opacity-50'>
              <ReactWordcloud options={wordCloudOptions} words={words} />
            </div>
          </Resizable> */}
            <div className="w-full h-full text-gray-900 font-bold text-8xl text-center italic flex flex-col justify-center" >{destinations}</div>
        </div>
      </div>
    </div>
  )
}

export default PriceJumbotron
