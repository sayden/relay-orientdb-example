import User from './components/User.js';
import AppHomeRoute from './routes/AppHomeRoute';

React.render(
  <Relay.RootContainer
    Component={User}
    route={new AppHomeRoute({userId: "55ddeec2a54c37e61e0a211c"})}
  />,
  document.getElementById('root')
);
