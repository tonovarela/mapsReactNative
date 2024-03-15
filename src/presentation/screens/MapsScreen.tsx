import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native'
import { Map } from '../components/maps/Map'
import { useLocationStore } from '../store/location/useLocation.store';
import { LoadingScreen } from './LoadingScreen';

export const MapsScreen = () => {  
  const {lastKnowLocation,getLocation}= useLocationStore();
  useEffect(()=>{
   if (lastKnowLocation==null) {
    getLocation();
   }

  },[lastKnowLocation])
  if (lastKnowLocation === null) {
    return (
      <LoadingScreen/>
    )
  }

  return (
    <View style={styles.container}>      
      <Map initialLocation={lastKnowLocation} showUserLocation  />         
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
  }
});