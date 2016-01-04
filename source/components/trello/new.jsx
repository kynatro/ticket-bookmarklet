import TrelloBoards from "./boards.jsx"
import TrelloBoardLists from "./board_lists.jsx"

class TrelloNew extends React.Component {
  constructor(props) {
    super(props)

    this.getBoards.bind(this)
    this.selectBoard.bind(this)

    this.state = {
      boards: [],
      boardId: localStorage.getItem('boardId'),
      lists: [],
      listId: localStorage.getItem('listId'),
      organizations: {}
    }
  }

  componentWillMount() {
    this.getBoards()

    // Get the lists for any stored boardId as well
    if(this.state.boardId) this.getLists(this.state.boardId)
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
    }, (message) => {
      console.error(message)
    })
  }

  getLists(boardId) {
    Trello.get(`/boards/${boardId}/lists`, {
      filter: "open",
      fields: "idBoard,name"
    }, (lists) => {
      this.setState({
        lists: lists
      })
    }, (message) => {
      console.error(message)
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

  render() {
    return (
      <form>
        <h1>New Bug</h1>
        <TrelloBoards boardId={this.state.boardId} boards={this.state.boards} selectBoard={this.selectBoard.bind(this)} />
        <TrelloBoardLists listId={this.state.listId} lists={this.state.lists} selectList={this.selectList.bind(this)} />
      </form>
    )
  }
}

export default TrelloNew
