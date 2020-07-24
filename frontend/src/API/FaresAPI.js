const baseUrl = 'http://localhost:8000'

const getFares = async (searchObj) => {
  let response = await fetch(`${baseUrl}/get-fares`, {
    headers: {
      'Content-Type': 'application/json',
      },
    method: 'POST',
    body: JSON.stringify(searchObj)
  })
  // console.log(response)
  // let responseJson = await response.json()
  // console.log(responseJson)
  return response
}

export default {
  getFares,
}