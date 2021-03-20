import React, { useState } from 'react';
import { StyleSheet, Button, View, Text, ActivityIndicator, Alert } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

interface Location {
    latitude: number,
    longitude: number,
}

const LocationPicker = (props:any) => {

    const [ pickedLocation, setPickedLocation ] = useState<Location | null>();
    const [ isFetching, setIsFetching ] = useState(false);

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);
        if (result.status !== 'granted') {
            Alert.alert('Insufficcient permissions!', 'You need to grant location permissions to use this app.', [{text: 'Ok'}]);
            return false;
        }

        return true;
    }

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission){
            return;
        }

        try {
            setIsFetching(true);
            const locationResponse = await Location.getCurrentPositionAsync({timeInterval: 5000});
            setPickedLocation({ latitude: locationResponse.coords.latitude, longitude: locationResponse.coords.longitude});
        } catch (err) {
            Alert.alert('Could not fetch location!', 'Please try again later or pick a location on the map.', [{text: 'ok'}]);
        } finally {
            setIsFetching(false);
        }
        
    };

    return (
        <View>
            <View>
                { isFetching? (
                    <ActivityIndicator size="large" color='red'/>
                ): (
                    <Text>No location chosen yet!</Text>
                )}
            </View>
            <Button title="Get locationn" onPress={getLocationHandler}/>
        </View>
    );
};

const styles = StyleSheet.create({

});

export default LocationPicker;