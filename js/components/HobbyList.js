import Hobby from './Hobby.js';

class HobbyList extends React.Component {
  render() {
    let user = this.props.users;
    let hobbies = user.hobbies.map((hobby) => {
      return <Hobby hobbies={hobby} />;
    });

    return(<li>{hobbies}</li>);
  }
}

export default Relay.createContainer(HobbyList, {
  fragments: {
    users: () => Relay.QL`
      fragment users on User {
        hobbies {
          ${Hobby.getFragment('hobbies')}
        }
      }`
  }
});