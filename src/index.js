import routie from '../lib/routie'
import getCard from './components/Card'

const formEl = document.querySelector('.search')
const queryEl = formEl.querySelector('.search__query')
const resultsEl = document.querySelector('.results')
const apiKey = 'rrok6oy5kysthf2v2fyh4qja'

formEl.addEventListener('submit', e => {
  e.preventDefault()

  const script = document.createElement('script')
  const query = queryEl.value

  if (!query) return

  routie(`listings/${query}`)

  script.setAttribute('src', `https://openapi.etsy.com/v2/listings/active.js?callback=EtsySearch.callback&api_key=${apiKey}&limit=5&keywords=${query}&fields=title,url,price`)

  document.head.appendChild(script)
  document.head.removeChild(script)
});

export function callback(data) {
  data.results.forEach(result => {
    resultsEl.appendChild(getCard(result))
  })
}
