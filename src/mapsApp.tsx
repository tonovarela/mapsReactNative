import {enableLatestRenderer} from 'react-native-maps';
import React from 'react';
import { StackNavigator } from './presentation/navigation/StackNavigator';

export const MapsApp = () => {
  enableLatestRenderer();
  return (
    
      <StackNavigator />
    

  )
}