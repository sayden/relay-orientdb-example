import User from './components/User.js';
import AppHomeRoute from './routes/AppHomeRoute';

React.render(
  <Relay.RootContainer
    Component={User}
    route={new AppHomeRoute({userId: "55db27b18809ab5a24752fbd"})}
  />,
  document.getElementById('root')
);
