import User from './User.js';

class UserList extends React.Component {
  render() {
    console.log("UserList", this.props.relay);
    console.log("UserList", this.props);
    let {users} = this.props;
    console.log("UserList", users);

    return(
      <ul>
      {users.map(user => {
        return <li><User user={user} /></li>
      })}
      </ul>
    );
  }
}

export default Relay.createContainer(UserList, {
  fragments: {
    user: () => Relay.QL`
      fragment on User {
        name,
        surname,
      },
    `,
  }
});