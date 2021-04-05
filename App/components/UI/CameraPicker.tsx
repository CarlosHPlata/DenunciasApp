import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, Alert} from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@react-navigation/native';

import CustomButton from './CustomButton';
import AdaptativeTouchable from './AdaptativeTouchable';

const CameraPicker = (props:any) => {

    const [ pickedImage, setPickedImage ] = useState<string>();
    const colors:any = useTheme().colors;

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA, Permissions.MEDIA_LIBRARY);
        if (result.status !== 'granted') {
            Alert.alert('Insufficcient permissions!', 'You need to grant location permissions to use this app.', [{text: 'Ok'}]);
            return false;
        }

        return true;
    }

    const takeImageHandler = async (openCamera: boolean) => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission){
            return;
        }
        
        const image = openCamera? 
        await ImagePicker.launchCameraAsync({
            quality: 0.2,
        }) :
        await ImagePicker.launchImageLibraryAsync({
            quality: 0.2
        });

        console.log(image);

        if (!image.cancelled){
            setPickedImage(image.uri);
        }
    };

    return (
        <View style={styles.immagePicker}>
            <View style={styles.immagePreview}>
                { pickedImage? 
                    <Image source={{uri: pickedImage}} style={styles.image}/> :
                    <Text>No has seleccionado una imagen</Text>
                }
            </View>
            <View style={styles.cameraButtons}>
                <View style={styles.buttonContainer}>
                    <AdaptativeTouchable onPress={() => takeImageHandler(true)} style={[styles.button, {backgroundColor: colors.primaryLight}]}>
                        <Ionicons name="camera-outline" size={30} color={colors.complementaryDark} />
                    </AdaptativeTouchable>
                </View>

                <View style={styles.buttonContainer}>
                    <AdaptativeTouchable onPress={() => takeImageHandler(false)} style={[styles.button, {backgroundColor: colors.primaryLight}]}>
                        <Ionicons name="image-outline" size={30} color={colors.complementaryDark} />
                    </AdaptativeTouchable>
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    immagePicker: {
        alignItems: 'center',
    },
    immagePreview: {
        width: '100%',
        height: 200,
        marginBottom: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: "#ccc",
        borderWidth: 1,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    button: {
        padding: 8,
        borderRadius: 5,
        overflow: 'hidden',
    },
    buttonContainer: {
        marginRight: 10,
    },
    cameraButtons: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-start',
    },
});

export default CameraPicker;