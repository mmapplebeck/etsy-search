import routie from '../../lib/routie'
import { getResults } from '../components/Results'
import { setQuery } from '../components/SearchForm'

export const init = () => routie('listings/:query', query => {
  setQuery(query)
  getResults(query)
})

export const linkTo = path => routie(path)
