import React from 'react'
import profileImage from '../assets/profile_small.png'

const AboutPage = (props) => {
  props.handleUpdateNavTitle('About')
  return (
    <div className='text-gray-300'>
      <div className='flex justify-center'>
        <img src={profileImage} className='profileImage w-48' ></img>
      </div>
      <div className='w-full px-10 my-16 text-lg lg:w-5/6'>
        <p>
          Hello, my name is Jason and welcome to my first full-stack web-app. This site was programed using Django with DRF in the back-end and React in the front end. It also makes use of 
          <a className="text-blue-400" href='https://developer.sabre.com/docs/rest_apis/air/search/destination_finder/reference-documentation#/default/destinationFinder'> Sabre's </a>
          APIs to find available flights as well as
         <a className="text-blue-400" href="https://unsplash.com/"> Unsplash's </a>
          API to display related images. Each JetOut search hits Sabre's API for new results, however related image links are cached using Django's ORM with PostgreSQL.
        </p>
      </div>
      <a className='w-full px-10 my-4 text-lg lg:w-5/6 italic text-blue-400' href="https://www.linkedin.com/in/jason-pul/">Find me on LinkedIn</a>
    </div>
  )
}

export default AboutPage
