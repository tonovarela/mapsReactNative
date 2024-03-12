import React, { PropsWithChildren, useEffect } from 'react';
import { AppState} from 'react-native'
import { usePermissionStore } from '../store/permisions/usePermision.store';
import {  useNavigation } from '@react-navigation/native';




export const PermissionChecker = ({ children }: PropsWithChildren) => {
    const { locationStatus, checkLocationPermission } = usePermissionStore();
    const navigation = useNavigation();

    useEffect(() => {
        if (locationStatus=== 'granted'){
            navigation.navigate('MapsScreen' as never);            
        }
        if (locationStatus==='undeterminated' ){
            navigation.navigate('PermisionsScreen' as never);            
        }
    }, [locationStatus]);
    useEffect(() => {
        const subscription = AppState.addEventListener('change', (nexState) => {
            if (nexState === 'active') {
                checkLocationPermission();
            }

        });
        return () => {
            subscription.remove();
        }
    }, [])

    return (
        <>
            {children}
        </>

    )
}