// Styles
import Stylesheet from "./stylesheets/app.scss"

// React Modules
import { render } from "react-dom"
import history from "./config/history.js"
import { Router, Route, IndexRoute } from "react-router"

// External script loader
import $script from "scriptjs"

// App routes
import { routes } from "./config/routes.js"

// Boot app after loading Trello API successfully
$script(`https://api.trello.com/1/client.js?key=${TRELLO_API_KEY}`, () => {
  render(<Router history={history} routes={routes} />, document.querySelector('main'))
}, (notFound) => {
  console.log("Trello API could not be loaded")
})
