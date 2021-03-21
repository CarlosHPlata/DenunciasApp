import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Button, View, Text, ActivityIndicator, Alert } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import MapPreview from './MapPreview';

import ENV from '../../../env';
import AdaptativeTouchable from './AdaptativeTouchable';


interface Location {
    latitude: number,
    longitude: number,
}

const LocationPicker = (props:any) => {

    const [ pickedLocation, setPickedLocation ] = useState<Location | null>();
    const [ address, setAdrress ] = useState();

    const [ isFetching, setIsFetching ] = useState(false);

    let selectedLocation:any;
    let selectedAddress:any;

    if (props.route?.params){
        selectedLocation = props.route.params.selectedLocation;
        selectedAddress = props.route.params.selectedAddress;
    }

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);
        if (result.status !== 'granted') {
            Alert.alert('Insufficcient permissions!', 'You need to grant location permissions to use this app.', [{text: 'Ok'}]);
            return false;
        }

        return true;
    }
    
    const fetchCurrentLocation = useCallback(async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission){
            return;
        }

        try {
            console.log('fetching');
            setIsFetching(true);
            const locationResponse = await Location.getCurrentPositionAsync({timeInterval: 5000});
            setPickedLocation({ latitude: locationResponse.coords.latitude, longitude: locationResponse.coords.longitude});

            const addressResponse = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${locationResponse.coords.latitude},${locationResponse.coords.longitude}&key=${ENV.googleMapsApiKey}`);
            if (!addressResponse.ok) {
                throw new Error('Something went wrong');
            }

            const addressData = await addressResponse.json();
            if (!addressData.results){
                throw new Error('Something went wrong');
            }

            setAdrress(addressData.results[0].formatted_address);
            props.onLocationChange({
                location: { latitude: locationResponse.coords.latitude, longitude: locationResponse.coords.longitude}, 
                address: addressData.results[0].formatted_address
            });
        } catch (e){
            Alert.alert('Could not fetch location!', 'Please try again later or pick a location on the map.', [{text: 'ok'}]);
        } finally {
            setIsFetching(false);
        }
    }, [setIsFetching, setPickedLocation, setAdrress, verifyPermissions]);


    useEffect(() => {
        if (selectedLocation) {
            setPickedLocation(selectedLocation);
            setAdrress(selectedAddress);
            props.onLocationChange({location: selectedLocation, address: selectedAddress});
        } else {
            (async () => {
                await fetchCurrentLocation();
            })();
        }
    }, [selectedLocation, selectedAddress]);


    if (isFetching){
        return <Text>Loading...</Text>
    }

    return (
        <AdaptativeTouchable onPress={props.onMapOpen}>
            <Text>{address}</Text>
        </AdaptativeTouchable>
    );
}

const styles = StyleSheet.create({

});

export default LocationPicker;