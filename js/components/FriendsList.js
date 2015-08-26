import Friend from './Friend.js';

class FriendList extends React.Component {
  render() {
    let user = this.props.users;
    let friends = user.friends.map((friend) => {
      return <Friend friend={friend} />;
    });

    return(<div>{friends}</div>);
  }
}

export default Relay.createContainer(FriendList, {
  fragments: {
    users: () => Relay.QL`
      fragment on User {
        friends {
          ${Friend.getFragment('friend')}
        }
      }`
  }
});