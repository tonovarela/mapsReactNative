import React from 'react';
import { Pressable, Text, View } from 'react-native'
import { globalStyle } from '../../config/theme/styles';
import { usePermissionStore } from '../store/permisions/usePermision.store';

export const PermisionsScreen = () => {
   const  {locationStatus,requestLocationPermission}= usePermissionStore();
    return (
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center'
        }}>        
            <Pressable style={globalStyle.btnPrimary} onPress={requestLocationPermission}>
            <Text style={{color:'white'}}>Habilitar ubicación</Text>
            </Pressable>

            <Text>
                Estado actual {locationStatus}
            </Text>
        </View>
    )
}