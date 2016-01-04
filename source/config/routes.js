// Components
import App from "./../components/app.jsx"
import TrelloAuthorizeFailed from "./../components/trello/authorize_failed.jsx"
import TrelloNew from "./../components/trello/new.jsx"

exports.routes = [
  {
    path: '/',
    component: App,
    indexRoute: { component: TrelloNew },
    childRoutes: [
      {
        path: 'new',
        component: TrelloNew
      },
      {
        path: 'authorize_failed',
        component: TrelloAuthorizeFailed
      }
    ]
  }
]
