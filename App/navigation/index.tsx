import React from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ColorSchemeName } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import AddReportScreen from '../screens/AddReportScreen';
import MapScreen from '../screens/MapScreen';


const Navigation = ({ colorScheme }: { colorScheme: ColorSchemeName }) => {

    return (
        <NavigationContainer theme={ colorScheme === 'dark'? DarkTheme : DefaultTheme }>
            <HelloNavigator />
        </NavigationContainer>
    );
};
export default Navigation;

const HelloStack = createStackNavigator();
const HelloNavigator = () => (
    <HelloStack.Navigator>
        <HelloStack.Screen name="Home" component={HomeScreen} />
        <HelloStack.Screen name="AddReport" component={AddReportScreen} />
        <HelloStack.Screen name="Map" component={MapScreen} />
    </HelloStack.Navigator>
);

