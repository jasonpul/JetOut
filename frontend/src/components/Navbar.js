import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = (props) => {
  return (
    <React.Fragment>
      <div className='relative pt-4 px-5 m-0 flex justify-between' style={{backgroundColor: '#242d3f'}}>
        <div className='flex justify-start content-end'>
          <Link to='/' className='ml-0 text-xl pt-6 font-bold text-gray-300 outlineText lg:pt-20 lg:text-4xl'>JetOut</Link>
          <Link to='/about' className='ml-5 text-xl pt-6 font-bold text-gray-300 outlineText lg:pt-20 lg:text-4xl'>about</Link>
        </div>
        
        <div 
          className='flex flex-col justify-center text-2xl font-bold text-gray-300 outlineText lg:text-8xl'
          style={{userSelect: 'none'}}
        >
            {props.navTitle}
        </div>
      </div>
      <hr className='border-black'/>
    </React.Fragment>
  )
}

export default Navbar
