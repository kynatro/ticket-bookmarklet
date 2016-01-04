class TrelloBoardLists extends React.Component {
  constructor(props) {
    super(props)

    this.defaultProps = {
      lists: []
    }
  }

  render() {
    let options = []

    this.props.lists.forEach((list) => {
      options.push(<option value={list.id} key={list.id}>{list.name}</option>)
    })

    return (
      <select onChange={this.props.selectList} value={this.props.listId}>
        {options}
      </select>
    )
  }
}

export default TrelloBoardLists
