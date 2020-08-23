/**
 * @format
 */
import React from 'react';
import {AppRegistry, View} from 'react-native';
import {name as appName} from './app.json';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {MainScreen} from './screens/mainScreen';
import {DetailsScreen} from './screens/detailsScreen';
import {SearchScreen} from './screens/searchScreen';

const App = () => (
  <Router>
    <View>
      <Switch>
        <Route path="/" exact component={MainScreen} />
        <Route path="/detail/:id" exact component={DetailsScreen} />
        <Route path="/search" exact component={SearchScreen} />
      </Switch>
    </View>
  </Router>
);

AppRegistry.registerComponent(appName, () => App);
AppRegistry.runApplication(appName, {
  rootTag: document.getElementById('root'),
});
