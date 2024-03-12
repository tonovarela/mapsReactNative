import { createStackNavigator } from '@react-navigation/stack';
import { LoadingScreen, MapsScreen, PermisionsScreen } from '../screens';
import { NavigationContainer } from '@react-navigation/native';
export const StackNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <NavigationContainer>
            <Stack.Navigator
            initialRouteName='PermisionsScreen'
            screenOptions={
                {
                    headerShown: false,
                    cardStyle:{
                        backgroundColor: '#fff',
                    }                    
                }
            }
             >
                <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
                <Stack.Screen name="MapsScreen" component={MapsScreen} />
                <Stack.Screen name="PermisionsScreen" component={PermisionsScreen} />
            </Stack.Navigator>
        </NavigationContainer>

    )
}