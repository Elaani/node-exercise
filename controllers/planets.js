const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const getAllPlanets = async (req, res) => {
  res.send(await fetchAllSWPlanets(1, []))
}

// fetches all planets
async function fetchAllSWPlanets(
  page, previousResponse
) {
  const response = await fetch(`https://swapi.dev/api/planets/?page=${page}`)
  const newResponse = await response.json()
  const resp = previousResponse.concat(newResponse.results)
  if (newResponse.next !== null) {
    page++
    return fetchAllSWPlanets(page, resp)
  }
  return getPeople(resp)
}

// loops through all residents
async function getPeople(array) {
  array = await array
  for (const key of array) {
    for (i = 0; i < key.residents.length; i++) {
      key.residents[i] = await getName(key.residents[i])
    }
  }
  return array
}

// retrieves the resident name(s)
async function getName(link) {
  const info = await fetch(link)
  const newInfo = await info.json()
  return newInfo.name
}

module.exports = {
  getAllPlanets
}