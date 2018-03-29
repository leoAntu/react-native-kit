
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import { Provider } from 'react-redux';
import configureStore from './store/store';
import AppNavigation from './AppNavigationState';
import SplashScreen from 'react-native-splash-screen';


const store = configureStore();

type Props = {};
export default class App extends Component<Props> {
    componentDidMount() {
        SplashScreen.hide(); // 隐藏启动屏
    }

  render() {
    return (
        <Provider store={store}>
          <AppNavigation/>
        </Provider>
    );
  }
}
