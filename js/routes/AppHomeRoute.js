class AppHomeRoute extends Relay.Route {
  static path = '/';

  static queries = {
    users: (Component) => Relay.QL `
      query {
        user (id: $userId) {
          ${Component.getFragment('users')}
        }
      }
    `
  };

  static paramDefinitions = { userId: {required: true} };
  static routeName = 'AppHomeRoute';
}

export default AppHomeRoute;