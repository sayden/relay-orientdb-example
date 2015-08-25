import User from './components/User.js';
import AppHomeRoute from './routes/AppHomeRoute';

React.render(
  <Relay.RootContainer
    Component={User}
    route={new AppHomeRoute({userId: "55dcda845ce127e00ec07279"})}
  />,
  document.getElementById('root')
);
