// Styles
import Stylesheet from "./stylesheets/app.scss"

// Modules
import { render } from "react-dom"
import { Router, Route, IndexRoute } from "react-router"

// Externals
import $script from "scriptjs"

// Components
import App from "./components/app.jsx"
import TrelloAuthenticate from "./components/trello/authenticate.jsx"
import TrelloNew from "./components/trello/new.jsx"

$script(`https://api.trello.com/1/client.js?key=${TRELLO_API_KEY}`, 'trelloApi')

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
];

render(<Router routes={routes} />, document.querySelector('main'))
