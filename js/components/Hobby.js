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
    hobbies: () => Relay.QL`
      fragment on User @relay(plural:true){
        hobbies {
          title
        }
      }`
  }
});