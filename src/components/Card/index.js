import template from './index.ejs'
import style from './style.scss'

export default function(data) {
  const card = document.createElement('a')
  card.classList.add('card')
  card.setAttribute('href', data.url)
  card.setAttribute('data-listing-id', data.listing_id)
  card.innerHTML = template(data)
  return card
}
