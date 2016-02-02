import Stylesheet from "../../stylesheets/components/boards.scss"

class TrelloBoards extends React.Component {
  constructor(props) {
    super(props)

    this.groupedBoards.bind(this)
  }

  groupedBoards() {
    let organizations = {
      "mine": {
        name: "myboards",
        displayName: "My Boards",
        id: "mine",
        boards: []
      }
    }

    this.props.boards.forEach((board) => {
      let organizationId = (board.organization && board.idOrganization) || "mine"

      if(board.organization && !organizations[organizationId]) {
        organizations[organizationId] = board.organization
        organizations[organizationId].boards = []
      }

      organizations[organizationId].boards.push(board)
    })

    return organizations
  }

  render() {
    let classNames = `${this.constructor.name} c-select`
    let groupedBoards = this.groupedBoards()
    let optionGroups = []

    for(let organizationId in groupedBoards) {
      let organization = groupedBoards[organizationId]
      let options = []

      organization.boards.forEach((board) => {
        options.push(<option value={board.id} key={board.id}>{board.name}</option>)
      })

      optionGroups.push(<optgroup label={organization.displayName} key={organization.id}>{options}</optgroup>)
    }

    return (
      <select onChange={this.props.update} value={this.props.boardId} className={classNames}>
        {optionGroups}
      </select>
    )
  }
}

export default TrelloBoards
