import User from './components/User.js';
import AppHomeRoute from './routes/AppHomeRoute';

React.render(
  <Relay.RootContainer
    Component={User}
    route={new AppHomeRoute({userId: "55dc777a00df3f1752a4ac74"})}
  />,
  document.getElementById('root')
);
