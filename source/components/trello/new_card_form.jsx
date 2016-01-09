import UaParser from "ua-parser-js"
import TrelloBoards from "./boards.jsx"
import TrelloBoardLists from "./board_lists.jsx"
import TrelloScreenshots from "./screenshots.jsx"
import FormGroup from "../common/form_group.jsx"

let boardLists = {}

class NewCardForm extends React.Component {
  constructor(props) {
    super(props)

    this.getBoards.bind(this)
    this.selectBoard.bind(this)

    this.$window = $(window.parent)

    this.state = {
      boards: [],
      boardId: localStorage.getItem('boardId'),
      cardName: "",
      cardDescription: "",
      lists: [],
      listId: localStorage.getItem('listId'),
      organizations: {},
      screenshots: []
    }
  }

  componentWillMount() {
    this.getBoards()
  }

  getBoards() {
    Trello.get("/member/me/boards", {
      filter: "open",
      fields: "id,name,idOrganization",
      organization: true
    }, (boards) => {
      this.setState({
        boards: boards
      })

      // If no boardId is set, use the first board in the list
      if(!this.state.boardId) {
        this.setState({
          boardId: this.state.boards[0].id
        })
      }

      // Populate the lists immediately when the UI is loaded
      this.getLists(this.state.boardId)
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

  render() {
    return (
      <form onSubmit={this.submit.bind(this)}>
        <FormGroup label="Board:" className="row">
          <TrelloBoards boardId={this.state.boardId} boards={this.state.boards} update={this.selectBoard.bind(this)} />
        </FormGroup>

        <FormGroup label="List:" className="row">
          <TrelloBoardLists listId={this.state.listId} lists={this.state.lists} update={this.selectList.bind(this)} />
        </FormGroup>

        <FormGroup label="Name:" className="row">
          <input type="text" className="form-control" onChange={this.updateCardName.bind(this)} value={this.state.cardName} />
        </FormGroup>

        <FormGroup label="Description:" textMuted="Markdown allowed in this field" className="row">
          <textarea className="form-control" onChange={this.updateCardDescription.bind(this)} value={this.state.cardDescription} rows="5"></textarea>
        </FormGroup>

        <FormGroup label="Screenshots:" textMuted="(Optional) Links from Monosnap, Droplr, Skitch, etc." className="row">
          <TrelloScreenshots update={this.updateScreenshots.bind(this)} />
        </FormGroup>

        <div className="form-group row">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-primary">Submit Ticket</button>
          </div>
        </div>
      </form>
    )
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
      width: this.$window.width(),
      height: this.$window.height()
    }
    let href = window.parent.location.href

    let screenshots = this.state.screenshots.reduce((memo, screenshot) => {
      return memo += "\n" + screenshot
    }, "")

    new Promise((resolve, reject) => {
      Trello.post("/cards/", {
        name: this.state.cardName,
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
**Screen size:** ${screenSize.width} x ${screenSize.height}

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
      console.log("Trello card created", response)
    })
    .catch((reason) => {
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

export default NewCardForm
