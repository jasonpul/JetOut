import React from 'react'
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import airports from '../data/reducedAirports.json'
import DayPicker, { DateUtils } from 'react-day-picker';
import 'react-day-picker/lib/style.css';
import './DatePicker.css';


const StripTime = (date) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

const DestinationSearch = (props) => {
  const [userSelection, setUserSelection] = React.useState(null)
  const [dateRange, setDateRange] = React.useState({from: undefined, to: undefined})
  const [goodDateRange, setGoodDateRange] = React.useState(false)
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
    // setUserSelection(airports[1990])
    setUserSelection(airports[2174])
    setGoodDateRange(true)
  }, [])

  const today = new Date() //update to API

  const onSubmit = (event) => {
    event.preventDefault()
    if (userSelection && dateRange.from && dateRange.to) {
      props.onSubmit(userSelection.code, dateRange)
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
      } else {
        setGoodDateRange(false)
      }
    }
  }
  
  return (
    <div className='w-2/3 rounded overflow-hidden my-10 mx-auto'>
      <form onSubmit={onSubmit} className="w-full ">
        <div className="flex items-center py-2">
          <Autocomplete
            id="combo-box-demo"
            options={airports}
            getOptionLabel={option => `${option.city} (${option.code})`}
            defaultValue={airports[2174]}
            onChange={(event, value) => setUserSelection(value)}
            className='rounded w-full mr-3'
            renderInput={params => (
              <TextField {...params} label="Departure Airport Code or City..." variant="outlined" />
            )}
          />
          <button className={buttonStyle} type="submit">Search</button>
        </div>
        <DayPicker
          className="Selectable"
          numberOfMonths={2}
          selectedDays={[dateRange.from, {from: dateRange.from, to: dateRange.to }]}
          disabledDays={{before: today}}
          modifiers={{ start: dateRange.from, end: dateRange.to }}
          onDayClick={handleDateChange}
        />
      </form>
		</div>

  )
}

export default DestinationSearch