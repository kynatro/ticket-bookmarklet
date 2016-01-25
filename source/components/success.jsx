import { Link } from "react-router"

class Success extends React.Component {
  constructor(params) {
    super(params)

    this.state = {
      cardUrl: null
    }
  }

  close() {
    window.close()
  }

  componentDidMount() {
    if(this.props.location.query.card){
      this.setState({
        cardUrl: decodeURIComponent(this.props.location.query.card)
      })
    }
  }

  render() {
    let viewTicket

    if(this.state.cardUrl){
      viewTicket = <a href={this.state.cardUrl} target="_blank">View this ticket in Trello</a>
    }

    return (
      <div className="jumbotron jumbotron-fluid">
        <div className="container">
          <h1 className="display-2">Success!</h1>
          <p className="lead">New bug created successfully! {viewTicket}</p>
          <p><Link to="/new" className="btn btn-primary btn-lg">Submit another bug</Link></p>
          <p>or <a onClick={this.close}>Close this window</a></p>
        </div>
      </div>
    )
  }
}

export default Success
