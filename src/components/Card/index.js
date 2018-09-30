import template from './index.ejs'
import style from './style.scss'

export default function(data) {
  const item = document.createElement('li')
  item.setAttribute('data-listing-id', data.listing_id)
  item.classList.add('result')
  item.innerHTML = template(data)
  return item
}
