import style from './style.scss'
import { init as initSearch } from './components/SearchForm'
import { init as initRoutes } from './routes'
import { onFetch as etsyCallback } from './components/Results'

initRoutes()
initSearch()

export const onFetch = etsyCallback
