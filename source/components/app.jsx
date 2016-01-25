/* global Trello */

class App extends React.Component {
  constructor(props) {
    super(props)

    this.authorize = this.authorize.bind(this)
  }

  componentWillMount() {
    if(this.props.history.createLocation().pathname != "/authorize_failed") this.authorize()
  }

  authorize() {
    new Promise((resolve, reject) => {
      Trello.authorize()

      if(!Trello.authorized()) {
        Trello.authorize({
          type: "redirect",
          name: APP_NAME,
          scope: {
            read: true,
            write: true
          },
          expiration: "30days",
          persist: true,
          success: () => {
            resolve(true)
          },
          failure: () => {
            reject(false)
          }
        })
      }
    })
    .then(() => {
      console.log("Trello authorization successful")
    })
    .catch((reason) => {
      history.push('/authorize_failed')

      console.error("Trello authorization unsuccessful", reason)
    })
  }

  render() {
    return (
      <div className="container-fluid">
        {this.props.children}
      </div>
    )
  }
}

export default App
