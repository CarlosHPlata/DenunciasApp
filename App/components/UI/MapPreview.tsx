import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

import ENV from '../../../env';
import AdaptativeTouchable from './AdaptativeTouchable';

interface Location {
    latitude: number|null|undefined,
    longitude: number|null|undefined,
}

const MapPreview = (props:{location:Location|null|undefined, children:React.ReactNode, onPress:any}) => {
    let imagePreviewUrl;

    if (props.location) {
        imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${props.location.latitude},${props.location.longitude}&zoom=14&size=400x200&maptype=roadmap
        &markers=color:red%7C${props.location.latitude},${props.location.longitude}
        &key=${ENV.googleMapsApiKey}`;
    }

    return (
        <AdaptativeTouchable onPress={props.onPress} style={styles.mapPreview}>
            {props.location? (
                <Image style={styles.mapImage} source={{uri: imagePreviewUrl}} />
            ) : props.children }
        </AdaptativeTouchable>
    );
};

const styles = StyleSheet.create({
    mapPreview: {
        marginBottom: 10,
        width: '100%',
        height: 150,
        borderColor: '#ccc',
        borderWidth: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapImage: {
        width: '100%',
        height: '100%',
    }
});

export default MapPreview;