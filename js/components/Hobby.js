class Hobby extends React.Component {
  render() {
    let hobby = this.props.hobbies;
    return(
      <li>
        {hobby.title}
        <ul>
          <li>{hobby.description}</li>
        </ul>
      </li>);
  }
}

export default Relay.createContainer(Hobby, {
  fragments: {
    hobbies: () => Relay.QL`
      fragment on Hobby {
        title
        description
      }`
  }
});