import { createStackNavigator } from '@react-navigation/stack';
import { LoadingScreen, MapsScreen, PermisionsScreen } from '../screens';
import { NavigationContainer } from '@react-navigation/native';
import { PermissionChecker } from '../providers/PermissionChecker';

export const StackNavigator = () => {
    const Stack = createStackNavigator();
    return (
        <NavigationContainer>
            <PermissionChecker>
                <Stack.Navigator initialRouteName='PermisionsScreen'
                    screenOptions={{headerShown: false,cardStyle: {backgroundColor: '#fff'}}}>
                    <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
                    <Stack.Screen name="MapsScreen" component={MapsScreen} />
                    <Stack.Screen name="PermisionsScreen" component={PermisionsScreen} />
                </Stack.Navigator>
            </PermissionChecker>

        </NavigationContainer>

    )
}