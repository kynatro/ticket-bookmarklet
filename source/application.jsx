import Stylesheet from "./stylesheets/app.scss"

import { render } from "react-dom"
import { Router, Route, IndexRoute } from "react-router"

import App from "./components/app.jsx"
import TrelloAuthenticate from "./components/trello/authenticate.jsx"
import TrelloNew from "./components/trello/new.jsx"

const routes = [
  {
    path: '/',
    component: App,
    indexRoute: { component: TrelloAuthenticate },
    childRoutes: [
      {
        path: 'new',
        component: TrelloNew
      },
      {
        path: 'authenticate',
        component: TrelloAuthenticate
      }
    ]
  }
]

render(<Router routes={routes} />, document.querySelector('main'))
