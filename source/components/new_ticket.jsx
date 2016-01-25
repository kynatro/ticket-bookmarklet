import TrelloNewCardForm from './trello/new_card_form.jsx'

class NewTicket extends React.Component {
  render() {
    return (
      <div className={this.constructor.name}>
        <h1>Submit New Bug</h1>

        <p>Choose a board and list to report the issue to and fill out a description below. Add any applicable screenshots via links (i.e. Monosnap, Droplr, etc.). Be as descriptive as possible and consider the following questions when writing your description:</p>

        <ul>
          <li>What were you doing, how did you do it?</li>
          <li>What did you expect to happen?</li>
          <li>What did happen?</li>
        </ul>

        <TrelloNewCardForm success={this.success.bind(this)} />
      </div>
    )
  }

  success(response) {
    this.props.history.push('/success?card=' + response.shortUrl)
  }
}

export default NewTicket
