/* eslint-disable react/react-in-jsx-scope */
/**
 * @format
 */
import { AppRegistry } from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {Provider} from 'react-redux';
import {store} from './src/store';
const ReactApp = () => {
  return (
    <>
      <Provider store={store}>
        <App />
      </Provider>
    </>
  );
};
AppRegistry.registerComponent(appName, () => ReactApp);
