// Styles
import Stylesheet from "./stylesheets/app.scss"

// React Modules
import { render } from "react-dom"
import history from "./config/history.jsx"
import { Router, Route, IndexRoute } from "react-router"

// External script loader
import $script from "scriptjs"

// App routes
import { routes } from "./config/routes.jsx"

// Trello token response handling. React Router breaks the default automatic token
// receipt and storage since it removes query parameters from window.location.search
// and places them in window.location.hash. We must catch the hash match here first
// and store it as a localStorage item so Trello can use it for authorization.
if(/token\=[a-f0-9]{64}/.test(window.location.hash)) {
  let matches = window.location.hash.match(/token\=([a-f0-9]{64})/)

  if(matches[1]) {
    // Store token in localStorage so client.js can authorize
    localStorage.setItem("trello_token", matches[1])
    // Remove the token parameter from the hash to prevent React Router missing route errors
    window.location.hash = window.location.hash.replace(/(\&|\?)token\=[a-f0-9]{64}/, "")
  }
}

// Boot app after loading Trello API successfully
$script(`https://api.trello.com/1/client.js?key=${TRELLO_API_KEY}`, () => {
  render(<Router history={history} routes={routes} />, document.querySelector('main'))
}, (notFound) => {
  console.log("Trello API could not be loaded")
})
