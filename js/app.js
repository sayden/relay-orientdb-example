import User from './components/User.js';
import AppHomeRoute from './routes/AppHomeRoute';

React.render(
  <Relay.RootContainer
    Component={User}
    route={new AppHomeRoute({userId: "55dd6672274c02ab0dfb3527"})}
  />,
  document.getElementById('root')
);
