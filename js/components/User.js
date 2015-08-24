class User extends React.Component {
  render() {
    console.log("User", this.props.relay);
    console.log("User", this.props);
    var user = this.props.users;
    console.log("User", user);

    return (
      <div>
        <h1>Hello {user.name} {user.surname}</h1>
        <h2>Hobbies</h2>
        <ul>
        {user.hobbies.map(hobby => {
            return <li>
                      Hobby name: {hobby.title}
                      <ul>
                        <li>Description: {hobby.description}</li>
                      </ul>
                   </li>;
          })}
        </ul>
        <h2>Age: {user.age}</h2>
      </div>
    );
  }
}

export default Relay.createContainer(User, {
  fragments: {
    users: () => Relay.QL`
      fragment on User {
        name,
        surname,
        age,
        hobbies {
          title
          description
        }
      },
    `,
  }
});