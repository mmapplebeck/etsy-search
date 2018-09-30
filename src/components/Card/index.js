import template from './index.ejs'

export default function(data) {
  const card = document.createElement('div')
  card.classList.add('card')
  card.innerHTML = template(data)
  return card
}
