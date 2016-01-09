// Components
import App from "./../components/app.jsx"
import TrelloAuthorizeFailed from "./../components/trello/authorize_failed.jsx"
import NewTicket from "./../components/new_ticket.jsx"

exports.routes = [
  {
    path: '/',
    component: App,
    indexRoute: { component: NewTicket },
    childRoutes: [
      {
        path: 'new',
        component: NewTicket
      },
      {
        path: 'authorize_failed',
        component: TrelloAuthorizeFailed
      }
    ]
  }
]
