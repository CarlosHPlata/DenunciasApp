import React from 'react';
import { StyleSheet, TextInput } from 'react-native';
import InputContainer from './InputContainer';

const Input = (props:any) => {

    return (
        <InputContainer label={props.label} iconName={props.iconName} iconColor={props.iconColor} >
            <TextInput
                value={props.value}
                onChangeText={props.onChangeText}
                {...props}
            />
        </InputContainer>
    );
};

const styles = StyleSheet.create({

});

export default Input;