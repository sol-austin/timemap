import '../scss/main.scss';
import React from 'react';
import Dashboard from './Dashboard.jsx';
import { ConnectedRouter } from 'connected-react-router'
import { Route, Switch } from 'react-router'

const App = ({ history }) => {
  return (
    <ConnectedRouter history={history}>
      <Switch>
        <Route path="/" component={Dashboard} />
        <Route path="/event/:eventId" component={Dashboard} />
      </Switch>
    </ConnectedRouter>
  );
}
  
export default App;
