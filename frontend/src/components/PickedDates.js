import React from 'react'

const DateToString = (date) => {
  return date.toString().split(' ').slice(0, 3).join(' ')
}

const PickedDates = (props) => {
  return (
    <div className='w-2/3 h-8 lg:w-1/4'>
      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
        Dates
      </label>
    
      <div 
        className='text-center py-1 px-1 rounded-md '
        style={{cursor: 'pointer', backgroundColor: '#edf2f7'}}
        onClick={props.handleToggleCalender}
      >
        {DateToString(props.dateRange.from)} → {DateToString(props.dateRange.to)}        
      </div> 
    </div>
  )
}

export default PickedDates
