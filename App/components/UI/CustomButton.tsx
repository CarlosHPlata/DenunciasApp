import { useTheme } from '@react-navigation/native';
import React from 'react';
import { Button, StyleSheet, View } from 'react-native';

const CustomButton = (props:{title: string, onPress: () => void}) => {

    const colors:any = useTheme().colors;

    return (
        <View style={styles.buttonContainer}>
            <Button title={props.title} color={colors.primaryLight} onPress={props.onPress} />
        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        marginHorizontal: 20,
        marginVertical: 10,
        borderRadius: 20,
        overflow: 'hidden'
    }
});

export default CustomButton;