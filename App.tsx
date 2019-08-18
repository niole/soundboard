import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import Main from './src/views/main';

const MainNavigator = createStackNavigator({
  Home: {screen: Main},
  Create: {screen: Main},
});

const App = createAppContainer(MainNavigator);

export default App;
