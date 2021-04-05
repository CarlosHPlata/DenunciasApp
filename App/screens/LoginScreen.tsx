import React from 'react';
import {StyleSheet, View, Text} from 'react-native';

const LoginScreen = () => {
    return (
	<View style={styles.screen}>
	    <Text>Hello World</Text>
	</View>
    ) ;
};

const styles = StyleSheet.create({
    screen: {
	flex: 1,
    },
});

export default LoginScreen;
