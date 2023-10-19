import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import TriviaScreen from './screens/TriviaScrn/MainContainer';
import ResultScreen from './screens/ResultsScrn/MainContainer'

const Stack = createNativeStackNavigator()

const AppNavigationContainer = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator
                initialRouteName='Trivia'
            >
                <Stack.Screen
                    name="Triva"
                    component={TriviaScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Results"
                    component={ResultScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigationContainer;
