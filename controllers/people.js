const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const _ = require('lodash');

const getAllPeople = async (req, res) => {
  res.send(await fetchAllSWPeople(req.query, 1, []))
}

// fetches all people
async function fetchAllSWPeople(
  urlQuery, page, previousResponse
) {
  const response = await fetch(`https://swapi.dev/api/people/?page=${page}`)
  const newResponse = await response.json()
  const resp = previousResponse.concat(newResponse.results)
  if (newResponse.next !== null) {
    page++
    return fetchAllSWPeople(urlQuery, page, resp)
  }
  return sortPeople(urlQuery, resp)
}

// sorts by height, name, mass, or if there's not query returns the array without sorting
function sortPeople(urlQuery, array) {
  if (JSON.stringify(urlQuery) === '{"sort":"height"}') {
    return (_.sortBy(array, (o) => { return parseInt(o.height); }));
  }
  else if (JSON.stringify(urlQuery) === '{"sort":"name"}') {
    return (_.sortBy(array, (o) => { return o.name; }));
  }
  else if (JSON.stringify(urlQuery) === '{"sort":"mass"}') {
    return (_.sortBy(array, (o) => { return parseInt((o.mass).replaceAll(',','')) }));
  } else {
    return array
  }
}

module.exports = {
  getAllPeople
}
