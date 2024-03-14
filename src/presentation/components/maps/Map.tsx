import React from 'react';import { Platform,  } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Location } from '../../../infrastructure/interfaces/location';

interface Props {
    showUserLocation?: boolean;
    initialLocation:Location
}

export const Map = ({showUserLocation=true,initialLocation}:Props) => {
    const { latitude, longitude } = initialLocation;
    return (
        <>
         <MapView
         showsUserLocation={showUserLocation}
          provider={Platform.OS==="ios"?undefined:PROVIDER_GOOGLE} 
          style={{flex:1}}
          region={{latitude,longitude,latitudeDelta: 0.015,longitudeDelta: 0.0121,}}
        >
            {/* <Marker 
            style={{width: 20, height: 20, borderRadius: 10}}
            image={require("../../../assets/marker.png")}
            coordinate={{
               latitude: 19.466336,longitude: -99.2679289
            }}
            description='Mi casa'
            title='Mi casa'
            ></Marker> */}
        </MapView>

        
        </>
    )
}
