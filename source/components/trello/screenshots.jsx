class TrelloScreenshots extends React.Component {
  constructor(props) {
    super(props)

    this.screenshots = []
  }

  addScreenshot() {
    if(this.screenshots.indexOf("") === -1) this.screenshots.push("")
    this.props.update(this.screenshots)
  }

  removeScreenshot(index) {
    this.screenshots.splice(index, 1)
    this.props.update(this.screenshots)
  }

  render() {
    let screenshots = this.screenshots.map((screenshot, index) => {
      return (
        <li className="list-group-item" key={index}>
          <div className="input-group">
            <input type="text" className="form-control" value={screenshot} placeholder="http://take.ms/abcde" onChange={this.updateScreenshot.bind(this, index)} />
            <span className="input-group-btn">
              <button className="btn btn-secondary" type="button" onClick={this.removeScreenshot.bind(this, index)}>
                &times;
              </button>
            </span>
          </div>
        </li>
      )
    })

    return (
      <ul className="list-group">
        {screenshots}
        <li className="list-group-item"><button className="btn btn-secondary btn-sm" type="button" onClick={this.addScreenshot.bind(this)}>Add Screenshot</button></li>
      </ul>
    )
  }

  updateScreenshot(index, event) {
    this.screenshots[index] = event.target.value
    this.props.update(this.screenshots)
  }
}

export default TrelloScreenshots
