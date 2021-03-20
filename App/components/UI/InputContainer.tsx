import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface iconProperties {
    name:any,
    color?:string | undefined,
    size?:number | undefined,
}

const InputContainer = (props:{label:string, children?:React.ReactNode|undefined, iconName?:any|undefined, iconColor?:string|undefined, iconSize?:number | undefined}) => {

    return (
        <View style={styles.container}>
            { !!props.iconName && (
                <View style={styles.iconContainer}>
                    <Ionicons name={props.iconName} size={props.iconSize || 32} color={props.iconColor || '#ccc'} />
                </View>
            )}
            
            <View style={styles.input}>
                <Text style={styles.label}>{props.label}</Text>
                { props.children }
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingRight: 10,
    },
    input: {
        borderBottomColor: '#ccc',
        borderBottomWidth: 1,
        paddingTop: 10,
        marginVertical: 10,
        flex: 1,
    },
    label: {
        marginVertical: 5,
    }
});

export default InputContainer;