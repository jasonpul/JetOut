import React from 'react'
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import airports from '../data/reducedAirports.json'
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import './DatePicker.css';
import DestinationFilter from './DestinationFilter';
import PickedDates from './PickedDates';


const StripTime = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}


const DestinationSearch = (props) => {
  const [userSelection, setUserSelection] = React.useState(null)
  const [travelFilter, setTravelFilter] = React.useState('All')
  const [dateRange, setDateRange] = React.useState({from: undefined, to: undefined})
  const [goodDateRange, setGoodDateRange] = React.useState(false)
  const [showCalender, setShowCalender] = React.useState('block')
  const [buttonStyle, setButtonStyle] = React.useState(
    'flex-shrink-0 h-full text-sm border-4 text-white py-1 px-2 rounded bg-gray-200 border-gray-200  hover:bg-gray-200 hover:border-gray-200'
  )

  React.useEffect(() => {
    setDateRange(
      {
        from: new Date(2020, 6, 31),
        to: new Date(2020, 7, 8, 10),
      }
    )
    setUserSelection(airports[1990])
    // setUserSelection(airports[2174])
    setGoodDateRange(true)
    setShowCalender('hidden')
  }, [])

  const today = new Date() //update to API

  const onSubmit = (event) => {
    event.preventDefault()
    if (userSelection && dateRange.from && dateRange.to) {
      props.onSubmit(userSelection.code, dateRange, travelFilter)
    }
  }

  React.useEffect(() => {
    if (userSelection && dateRange.from && dateRange.to && goodDateRange) {
      setButtonStyle(
        'flex-shrink-0 h-full text-sm border-4 text-white py-1 px-2 rounded bg-blue-500 border-blue-500 hover:bg-blue-700 hover:border-blue-700'
      )
    } else {
      setButtonStyle(
        'flex-shrink-0 h-full text-sm border-4 text-white py-1 px-2 rounded bg-gray-200 border-gray-200  hover:bg-gray-200 hover:border-gray-200'
      )
    }
  }, [userSelection, dateRange])

  const handleDateChange = (day) => {
    if ((StripTime(day) - StripTime(today)) >= 0) {
      const range = DateUtils.addDayToRange(day, dateRange)
      setDateRange(range)
      if (Math.ceil(range.to - range.from)/(1000*3600*24) <= 16) {
        setGoodDateRange(true)
        setShowCalender('hidden')
      } else {
        setGoodDateRange(false)
      }
    }
  }

  const handleToggleCalender = () => {
    showCalender === 'block' ? setShowCalender('hidden') : setShowCalender('block')
  }

  const handleTravelFilterChange = (event) => {
    const {target} = event
    setTravelFilter(target.options[target.selectedIndex].text)
  }
  
  return (
    <div className='w-full rounded overflow-hidden mt-2 mb-10 mx-auto bg-white p-6 shadow-lg lg:w-10/12'>
      <form onSubmit={onSubmit} className="w-full ">
        
        <div className="flex items-center py-2">
          <Autocomplete
            id="combo-box-demo"
            options={airports}
            getOptionLabel={option => `${option.city} (${option.code})`}
            defaultValue={airports[1990]}
            onChange={(event, value) => setUserSelection(value)}
            className='rounded w-full mr-3'
            renderInput={params => (
              <TextField {...params} label="Departure Airport Code or City..." variant="outlined" />
            )}
          />
          <button className={buttonStyle} type="submit">Search</button>
        </div>

        <div className="flex flex-col lg:flex-row lg:content-start lg:justify-start">

          <div className={`${showCalender}`}>
            <DayPicker
              className="Selectable"
              numberOfMonths={2}
              selectedDays={[dateRange.from, {from: dateRange.from, to: dateRange.to }]}
              disabledDays={{before: today}}
              modifiers={{ start: dateRange.from, end: dateRange.to }}
              onDayClick={handleDateChange}
            />
          </div>


          {(dateRange.from && dateRange.to) 
            ? <PickedDates dateRange={dateRange} handleToggleCalender={handleToggleCalender} />
            : null}
        
          <DestinationFilter handleTravelFilterChange={handleTravelFilterChange} />

        </div>


      </form>
		</div>

  )
}

export default DestinationSearch