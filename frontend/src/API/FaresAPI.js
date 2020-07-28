const baseUrl = 'http://localhost:8000'

const getFares = async (searchObj) => {
  let response = await fetch(`${baseUrl}/get-fares`, {
    headers: {
      'Content-Type': 'application/json',
      },
    method: 'POST',
    body: JSON.stringify(searchObj)
  })
  return response
}

const getFareDetails = async (detailObj) => {
  let response = await fetch(`${baseUrl}/fare-details`, {
    headers: {
      'Content-Type': 'application/json',
      },
    method: 'POST',
    body: JSON.stringify(detailObj)
  })
  return response
}

export default {
  getFares,
  getFareDetails,
}