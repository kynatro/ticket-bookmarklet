class TrelloBoardLists extends React.Component {
  render() {
    let options = []

    this.props.lists.forEach((list) => {
      options.push(<option value={list.id} key={list.id}>{list.name}</option>)
    })

    return (
      <select onChange={this.props.update} value={this.props.listId} className={this.constructor.name}>
        {options}
      </select>
    )
  }
}

export default TrelloBoardLists
