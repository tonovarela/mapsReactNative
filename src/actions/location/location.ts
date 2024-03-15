import Geolocation from '@react-native-community/geolocation';
import { Location } from '../../infrastructure/interfaces/location';

export const getCurrentLocation = async (): Promise<Location> => {
    return new Promise(async (resolve, reject) => {
        Geolocation.getCurrentPosition((info: any) => {
            resolve({ latitude: info.coords.latitude, longitude: info.coords.longitude });
        }, (error: any) => {
            console.log(error);
            reject(error);
        }, {})

    });
}


export const watchCurrentLocation = (locationCallback: (location: Location) => void) => {

    return Geolocation.watchPosition((info: any) => locationCallback({
        latitude: info.coords.latitude,
        longitude: info.coords.longitude
    }), (error: any) => {
        throw new Error('No se puede obtener la ubicación actual')
    }, { enableHighAccuracy: true })

}

export const clearWatchLocation = (watchId: number) => {
    Geolocation.clearWatch(watchId);
}