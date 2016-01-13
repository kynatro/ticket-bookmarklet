class TrelloBoardLists extends React.Component {
  render() {
    let classNames = `${this.constructor.name} c-select`
    let options = []

    this.props.lists.forEach((list) => {
      options.push(<option value={list.id} key={list.id}>{list.name}</option>)
    })

    return (
      <select onChange={this.props.update} value={this.props.listId} className={classNames}>
        {options}
      </select>
    )
  }
}

export default TrelloBoardLists
