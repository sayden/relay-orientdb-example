class Hobby extends React.Component {
  render() {
    let hobby = this.props.hobby;

    return(
      <li>
        Hobby name: {hobby.title}
        <ul>
          <li>Description: {hobby.description}</li>
        </ul>
      </li>
    );
  }
}

export default Relay.createContainer(Hobby, {
  fragments: {
    hobby: () => Relay.QL`
      fragment hobby on User {
        hobbies {
          title,
          description,
        },
      }
    `
  }
});