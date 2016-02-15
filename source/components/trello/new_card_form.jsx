import UaParser from "ua-parser-js"

import TrelloBoards from "./boards.jsx"
import TrelloBoardLists from "./board_lists.jsx"
import TrelloScreenshots from "./screenshots.jsx"
import FormGroup from "../common/form_group.jsx"
import Alert from "../common/alert.jsx"

import params from "../../common/params.js"

let boardLists = {}

class TrelloNewCardForm extends React.Component {
  constructor(props) {
    super(props)

    this.getBoards.bind(this)
    this.selectBoard.bind(this)

    this.state = {
      boards: [],
      boardId: localStorage.getItem('boardId'),
      cardDescription: "",
      cardName: "",
      lists: [],
      listId: localStorage.getItem('listId'),
      meId: localStorage.getItem('meId'),
      message: "",
      organizations: {},
      response: null,
      screenshots: [],
      submitting: false
    }
  }

  componentWillMount() {
    this.getBoards()
    this.getMe()
  }

  getBoards() {
    Trello.get("/member/me/boards", {
      filter: "open",
      fields: "id,name,idOrganization",
      organization: true
    }, (boards) => {
      let firstBoardId = boards[0].id

      this.setState({
        boards: boards
      })

      // If no boardId is set, use the first board in the list
      if(!this.state.boardId) {
        this.setState({
          boardId: firstBoardId
        })
      }

      // Populate the lists immediately when the UI is loaded
      this.getLists(this.state.boardId || firstBoardId)
    }, (message) => {
      console.error(message)
    })
  }

  getLists(boardId) {
    // Utilize a Promise here to allow for easier memoize resolution
    new Promise((resolve, reject) => {
      // Get new board lists
      if(!boardLists[boardId]) {
        Trello.get(`/boards/${boardId}/lists`, {
          filter: "open",
          fields: "idBoard,name"
        }, (lists) => {
          boardLists[boardId] = lists

          resolve(lists)
        }, (message) => {
          reject(message)
        })
      }
      // Or resolve with memoized value
      else {
        resolve(boardLists[boardId])
      }
    })
    .then((lists) => {
      this.setState({
        lists: lists,
        listId: lists[0].id
      })
    })
    .catch((reason) => {
      console.error(reason)
    })
  }

  getMe() {
    Trello.get('/member/me', (data) => {
      this.setState({
        meId: data.id
      })

      localStorage.setItem('meId', data.id)
    }, (message) => {
      console.error(reason)
    })
  }

  render() {
    let message

    if(this.state.response) {
      message = <Alert type={this.state.response}>{this.state.message}</Alert>
    }

    return (
      <form onSubmit={this.submit.bind(this)} className={this.constructor.name}>
        <FormGroup label="Board:">
          <TrelloBoards boardId={this.state.boardId} boards={this.state.boards} update={this.selectBoard.bind(this)} />
        </FormGroup>

        <FormGroup label="List:">
          <TrelloBoardLists listId={this.state.listId} lists={this.state.lists} update={this.selectList.bind(this)} />
        </FormGroup>

        <FormGroup label="Name:">
          <input type="text" className="form-control" onChange={this.updateCardName.bind(this)} value={this.state.cardName} required />
        </FormGroup>

        <FormGroup label="Description:" textMuted="Markdown allowed in this field">
          <textarea className="form-control" onChange={this.updateCardDescription.bind(this)} value={this.state.cardDescription} rows="5" required></textarea>
        </FormGroup>

        <FormGroup label="Screenshots:" textMuted="(Optional) Links from Monosnap, Droplr, Skitch, etc.">
          <TrelloScreenshots update={this.updateScreenshots.bind(this)} />
        </FormGroup>

        {message}

        <div className="form-group">
          <button type="submit" className="btn btn-primary" disabled={this.state.submitting}>Submit Ticket</button>
          <span className="loading"></span>
        </div>
      </form>
    )
  }

  reset() {
    this.setState({
      cardName: "",
      cardDescription: "",
      message: "",
      response: null,
      screenshots: [],
      submitting: false
    })
  }

  selectBoard(event) {
    let boardId = event.target.value

    this.setState({
      boardId: boardId
    })

    localStorage.setItem('boardId', boardId)

    this.getLists(boardId)
  }

  selectList(event) {
    let listId = event.target.value

    this.setState({
      listId: listId
    })

    localStorage.setItem('listId', listId)
  }

  submit(event) {
    event.preventDefault()

    let parser = new UaParser()
    let browser = parser.getBrowser()
    let device = parser.getDevice()
    let os = parser.getOS()
    let screenSize = {
      width: params('screenWidth'),
      height: params('screenHeight')
    }
    let href = decodeURIComponent(params('href'))

    let screenshots = this.state.screenshots.reduce((memo, screenshot) => {
      return memo += "\n" + screenshot
    }, "")

    this.setState({
      submitting: true
    })

    new Promise((resolve, reject) => {
      Trello.post("/cards/", {
        name: this.state.cardName,
        idMembers: `${this.state.meId}`,
        desc: `${this.state.cardDescription}

---

## Environment Information
**URL:** ${href}
**Browser:** ${browser.name}
**Browser version:** ${browser.version}
**Device type:** ${device.type || "Desktop or Laptop"}
**Device vendor:** ${device.vendor || "Unknown"}
**Device model:** ${device.model || "Unknown"}
**OS:** ${os.name}
**OS Version:** ${os.version}
**Screen size:** ${screenSize.width}px x ${screenSize.height}px

---

## Screenshots
${screenshots}`,
        idList: this.state.listId,
        due: null,
        position: "bottom"
      }, (response) => {
        resolve(response)
      }, (message) => {
        reject(message)
      })
    })
    .then((response) => {
      this.props.success(response)
    })
    .catch((reason) => {
      this.setState({
        response: "danger",
        message: <span><strong>Card could not be created:</strong> {reason}</span>,
        submitting: false
      })
      console.error("Trello card could not be created", reason)
    })
  }

  updateCardName(event) {
    this.setState({
      cardName: event.target.value
    })
  }

  updateCardDescription(event) {
    this.setState({
      cardDescription: event.target.value
    })
  }

  updateScreenshots(screenshots) {
    this.setState({
      screenshots: screenshots
    })
  }
}

export default TrelloNewCardForm
