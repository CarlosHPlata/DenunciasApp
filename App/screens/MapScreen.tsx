import { useTheme } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import MapView, { MapEvent, Marker } from 'react-native-maps';
import ENV from '../../env';

interface Location  {
    latitude:number,
    longitude:number
}

const MapScreen = (props:any) => {
    const [ selectedLocation, setSelectionLocation ] = useState<Location | null>();
    const [ mapRegion, setMapRegion ] = useState({
        latitude: 37.78,
        longitude: -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    });

    const colors:any = useTheme().colors;

    let markerCoordinates;

    if (selectedLocation){
        markerCoordinates = {
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude
        }
    }

    let location:Location | undefined;

    if (props.route?.params) {
        location = props.route.params.location;
    }

    useEffect(() => {
        if (location) {
            setSelectionLocation(location);
            setMapRegion({
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421
            });
        }
    }, [location]);

    const selectLocationHandler = (event:MapEvent) => {
        setSelectionLocation({
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude
        });
        setMapRegion({
            latitude: event.nativeEvent.coordinate.latitude,
            longitude: event.nativeEvent.coordinate.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        });
    };

    const onSave = () => {
        if (selectedLocation){
            fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${selectedLocation.latitude},${selectedLocation.longitude}&key=${ENV.googleMapsApiKey}`)
            .then(response => response.json())
            .then(response => {
                if (!response.results){
                    throw new Error('something went wrong');
                }
                const address = response.results[0].formatted_address;
                props.navigation.navigate('AddReport', {selectedLocation: selectedLocation, selectedAddress: address });
            })
            .catch(e =>  console.log(e))
        } else {
            return;
        }
    }

    return (
        <View style={styles.screen}>
            <MapView style={styles.map} region={mapRegion} onPress={selectLocationHandler}>
                {markerCoordinates && <Marker title="Picked Location" coordinate={markerCoordinates} />}
            </MapView>
            <Button color={colors.primaryLight} title="saveLocation" onPress={onSave}/>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,       
    },
    map: {
        flex: 1,
    }
});

export default MapScreen;