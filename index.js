/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './src/app';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import configureStore from './src/store/rootReducers';

const AppProvider = () => {
  const store = configureStore();

  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => AppProvider);
