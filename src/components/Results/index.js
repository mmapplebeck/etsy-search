import { apiKey } from '../../constants'
import getCard from '../Card'
import './style.scss'

const resultsEl = document.querySelector('.results')
const seeMoreEl = document.querySelector('.see-more')
const searchingClass = 'results--searching'
const noResultsClass = 'results--no-results'
let page = 0
let query

seeMoreEl.addEventListener('click', () => fetchResults(query))

export const getResults = q => {
  page = 0
  resultsEl.classList.remove(noResultsClass)
  resultsEl.innerHTML = ''
  query = encodeURIComponent(q)

  if (window.localStorage.getItem(query)) {
    page = 1
    const cachedResults = JSON.parse(window.localStorage.getItem(query))
    if (!cachedResults.length) {
      resultsEl.classList.add(noResultsClass)
    } else {
      displayResults(cachedResults)
    }
    return
  }

  fetchResults(query)
}

export const fetchResults = query => {
  resultsEl.classList.remove(noResultsClass)
  resultsEl.classList.add(searchingClass)

  const script = document.createElement('script')
  script.setAttribute('src', `https://openapi.etsy.com/v2/listings/active.js?\
    callback=EtsySearch.onFetch&api_key=${apiKey}&\
    page=${++page}&\
    keywords=${query}\
    &fields=listing_id,title,url,price&\
    includes=Shop,MainImage`)
  document.head.appendChild(script)
  document.head.removeChild(script)
}

export const displayResults = results => {
  results.forEach(result => {
    resultsEl.appendChild(getCard(result))
  })
  resultsEl.classList.remove(searchingClass)
}

export const onFetch = data => {
  if (!data.results.length) {
    resultsEl.classList.add(noResultsClass)
  }

  displayResults(data.results)

  if (page > 1) return

  try {
    window.localStorage.setItem(query, JSON.stringify(data.results))
  } catch (err) {
  }
}
