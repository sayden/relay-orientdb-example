import Hobby from './Hobby.js';

class HobbyList extends React.Component {
  render() {
    let user = this.props.user;
    let likes = user.likes.map((hobby) => {
      return <Hobby hobby={hobby} />;
    });

    return (<ul>{likes}</ul>);
  }
}

export default Relay.createContainer(HobbyList, {
  fragments: {
    user: () => Relay.QL`
      fragment users on User {
        likes {
          ${Hobby.getFragment('hobby')}
        }
      }`
  }
});