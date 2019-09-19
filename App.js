import React from 'react';
import CameraPage from './src/camera.page'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

export default class App extends React.Component {
  render () {
    return (
      <CameraPage/>
    );
  };
};