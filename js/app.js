import User from './components/User.js';
import AppHomeRoute from './routes/AppHomeRoute';

React.render(
  <Relay.RootContainer
    Component={User}
    route={new AppHomeRoute({userId: "55da2995e7f5581b3698f410"})}
  />,
  document.getElementById('root')
);
