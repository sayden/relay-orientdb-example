class Friend extends React.Component {
  render() {
    let friend = this.props.friend;
    return(
      <li>
        {friend.title}
        <ul>
          <li>{friend.description}</li>
        </ul>
      </li>
    );
  }
}

export default Relay.createContainer(Friend, {
  fragments: {
    friend: () => Relay.QL`
      fragment on Friend {
        title
        description
      }`
  }
});