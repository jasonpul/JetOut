import React from 'react'
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import airports from '../data/reducedAirports.json'

const DestinationSearch = (props) => {
  console.log(airports)
  return (
    <div className='w-2/3 rounded overflow-hidden my-10 mx-auto'>
      <form onSubmit={props.onSubmit} className="w-full ">
        <div className="flex items-center py-2">
          <Autocomplete
            id="combo-box-demo"
            options={airports}
            getOptionLabel={option => `${option.city} (${option.code})`}
            className='rounded w-full mr-3'
            renderInput={params => (
              <TextField {...params} label="Departure Airport Code or City..." variant="outlined" />
            )}
          />
          <button className="flex-shrink-0 h-full bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded" type="submit">Search</button>
        </div>
      </form>
		</div>

  )
}

export default DestinationSearch
