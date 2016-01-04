import { Link } from "react-router"

class TrelloAuthorizeFailed extends React.Component {
  render() {
    return (
      <div>
        <h2>Authorization Failed!</h2>
        <p>Authorization to access Trello was either denied or failed, please try again.</p>
        <Link to="/new">Authorize</Link>
      </div>
    )
  }
}

export default TrelloAuthorizeFailed
