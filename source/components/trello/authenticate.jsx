class TrelloAuthenticate extends React.Component {
  constructor(props) {
    super(props)

    this.authenticate = this.authenticate.bind(this)
  }

  authenticate() {
    console.log('foobar')
  }

  render() {
    return (
      <button onClick={this.authenticate}>Authenticate</button>
    )
  }
}

export default TrelloAuthenticate
