import { Link } from "react-router"

class App extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <nav>
          <h1>Application</h1>
          <ul>
            <li><Link to="/new">New</Link></li>
          </ul>
        </nav>
        <div>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default App
