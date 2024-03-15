import React, { useEffect, useRef, useState } from 'react'; import { Platform, } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE, Polyline } from 'react-native-maps';
import { Location } from '../../../infrastructure/interfaces/location';
import { FAB } from '../ui/FAB';
import { useLocationStore } from '../../store/location/useLocation.store';
interface Props {
    showUserLocation?: boolean;
    initialLocation: Location
}

export const Map = ({ showUserLocation = true, initialLocation }: Props) => {    
  const [isFollowingUser, setIsFollowingUser] = useState(false)
  const [isShowPolylines, setIsShowPolylines] = useState(true)

    const mapRef = useRef<MapView | null>(null);
    const { getLocation,lastKnowLocation,watchLocation,clearWatchLocation,userLocationsList } = useLocationStore();
    const cameraLocation = useRef<Location>(initialLocation);
    const moveCameraToLocation = (location: Location) => {
        if (!mapRef.current) {
            return;
        }
        mapRef.current?.animateCamera({
            center: location,
        });
    }
    const moveToCurrentLocation = async () => {
        if (!lastKnowLocation){
            moveCameraToLocation(initialLocation)
        }
        const location = await getLocation();
        if (!location) {
            return;
        }        
        moveCameraToLocation(location);
    }
    useEffect(()=>{
        if (lastKnowLocation) {            
            moveCameraToLocation(lastKnowLocation);
        }
    
    },[lastKnowLocation,isFollowingUser])

    useEffect(()=>{
        watchLocation();
        return ()=>{
            clearWatchLocation();
        }
    
    },[])




    return (
        <>
            <MapView
                ref={(map) => mapRef.current = map}
                showsUserLocation={showUserLocation}
                showsCompass={false}
                onTouchStart={()=>{ setIsFollowingUser(false) }}
                showsMyLocationButton={false}
                provider={Platform.OS === "ios" ? undefined : PROVIDER_GOOGLE}
                style={{ flex: 1 }}
                region={{ latitude: cameraLocation.current.latitude, longitude: cameraLocation.current.longitude, latitudeDelta: 0.015, longitudeDelta: 0.0121, }}
            >
                {
                    isShowPolylines && (
                        <Polyline strokeColor='blue' strokeWidth={5} coordinates={userLocationsList}></Polyline>
                    )
                }
                
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
            <FAB iconName={isShowPolylines?'eye-outline':'eye-off-outline'} style={{ bottom: 150, right: 20 }} onPress={()=>{setIsShowPolylines(!isShowPolylines)}}></FAB>
            <FAB iconName={isFollowingUser?'walk-outline':'accessibility-outline'} style={{ bottom: 90, right: 20 }} onPress={()=>{setIsFollowingUser(!isFollowingUser)}}></FAB>
            <FAB iconName='compass-outline' style={{ bottom: 30, right: 20 }} onPress={moveToCurrentLocation}></FAB>


        </>
    )
}
