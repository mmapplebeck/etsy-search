import { linkTo } from '../../routes'
import { getResults } from '../Results'
import './style.scss'

const formEl = document.querySelector('.search')
const queryEl = formEl.querySelector('.search__query')

export const setQuery = query => {
  queryEl.value = query
}

export const init = () => {
  formEl.addEventListener('submit', e => {
    e.preventDefault()
    const query = queryEl.value
    if (!query) return

    linkTo(`listings/${query}`)
    getResults(query)
  })
}
