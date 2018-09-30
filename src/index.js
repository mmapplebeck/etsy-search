import routie from '../lib/routie'
import getCard from './components/Card'
import style from './style.scss'

const formEl = document.querySelector('.search')
const queryEl = formEl.querySelector('.search__query')
const resultsEl = document.querySelector('.results')
const nextEl = document.querySelector('.next')
const apiKey = 'rrok6oy5kysthf2v2fyh4qja'
let page
let query

function encodedQuery() {
  return encodeURIComponent(query)
}

formEl.addEventListener('submit', e => {
  e.preventDefault()

  page = 0
  query = queryEl.value
  if (!query) return

  routie(`listings/${query}`)
  getResults()
});

nextEl.addEventListener('click', fetchResults)

function getResults() {
  resultsEl.innerHTML = ''

  const q = encodedQuery()

  if (localStorage.getItem(q)) {
    const cached = JSON.parse(localStorage.getItem(q))

    page = cached.page
    displayResults(cached.results);
    cached.results.forEach(result => {
      fetchImages(result.listing_id)
    })
    return
  }

  fetchResults()
}

function fetchResults() {
  const script = document.createElement('script')

  script.setAttribute('src', `https://openapi.etsy.com/v2/listings/active.js?callback=EtsySearch.onFetch&api_key=${apiKey}&limit=1&page=${++page}&keywords=${query}&fields=listing_id,title,url,price`)
  document.head.appendChild(script)
  document.head.removeChild(script)
}

routie('listings/:query', q => {
  query = q
  page = 0
  getResults()
});

function displayResults(results) {
  results.forEach(result => {
    resultsEl.appendChild(getCard(result))
  })
}

function fetchImages(listingId) {
  const script = document.createElement('script')

  script.setAttribute('src', `https://openapi.etsy.com/v2/listings/${listingId}/images.js?callback=EtsySearch.onFetchImages&api_key=${apiKey}&fields=listing_id,url_570xN`)
  document.head.appendChild(script)
  document.head.removeChild(script)
}

export function onFetchImages(data) {
  if (!data.results.length) return

  const imageEl = resultsEl.querySelector(`.card[data-listing-id="${data.params.listing_id}"] .card__image`)

  if (!imageEl) return

  imageEl.style.backgroundImage = `url(${data.results[0].url_570xN})`
}

export function onFetch(data) {
  query = data.params.keywords

  const q = encodedQuery()
  let results = data.results

  displayResults(results)
  results.forEach(result => {
    fetchImages(result.listing_id)
  })

  if (localStorage.getItem(q)) {
    results = JSON.parse(localStorage.getItem(q)).results.concat(results)
  }

  try {
    localStorage.setItem(q, JSON.stringify({
      page: data.params.page,
      results
    }))
  } catch(err) {
  }
}
