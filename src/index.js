import routie from '../lib/routie'
import getCard from './components/Card'

const formEl = document.querySelector('.search')
const queryEl = formEl.querySelector('.search__query')
const resultsEl = document.querySelector('.results')
const nextEl = document.querySelector('.next')
const apiKey = 'rrok6oy5kysthf2v2fyh4qja'
let page = 0
let query

function encodedQuery() {
  return encodeURIComponent(query)
}

formEl.addEventListener('submit', e => {
  e.preventDefault()

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
    return
  }

  fetchResults()
}

function fetchResults() {
  const script = document.createElement('script')

  script.setAttribute('src', `https://openapi.etsy.com/v2/listings/active.js?callback=EtsySearch.onFetch&api_key=${apiKey}&limit=1&page=${++page}&keywords=${query}&fields=title,url,price`)
  document.head.appendChild(script)
  document.head.removeChild(script)
}

routie('listings/:query', q => {
  query = q
  getResults()
});

function displayResults(results) {
  results.forEach(result => {
    resultsEl.appendChild(getCard(result))
  })
}

export function onFetch(data) {
  query = data.params.keywords
  
  const q = encodedQuery()
  let results = data.results

  displayResults(results)

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
