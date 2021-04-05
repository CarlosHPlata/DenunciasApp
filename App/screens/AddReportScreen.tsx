import React, { useCallback, useState } from 'react';
import { Button, ScrollView, KeyboardAvoidingView, Platform, StyleSheet, Text, View, ActivityIndicator, TextInput } from 'react-native';
import { StackActions } from '@react-navigation/routers';

import AdaptativeTouchable from '../components/UI/AdaptativeTouchable';
import Input from '../components/UI/Input';
import InputContainer from '../components/UI/InputContainer';
import * as ReportActions from '../store/actions/report';
import useAsyncActionDispatcher from '../hooks/useAsyncActionDispatcher';
import LocationPicker from '../components/UI/LocationPicker';
import CustomButton from '../components/UI/CustomButton';
import DatePicker from '../components/UI/DatePicker';
import { useTheme } from '@react-navigation/native';
import CameraPicker from '../components/UI/CameraPicker';

interface FullLocation {
    location: {
        latitude: number,
        longitude: number,
    },
    address: string
}

const AddReportScreen = (props:any) => {
    const [ date, setDate ] = useState(new Date());
    const [ location, setLocation ] = useState<FullLocation>();
    const [ description, setDescription ] = useState('');

    const colors:any = useTheme().colors;

    const [addReport, isLoading, error] = useAsyncActionDispatcher( ReportActions.addReport.bind(this, {
        date: date, 
        location: location, 
        description: description, 
        ownerId: 'u1' 
    }), [date, location, description]);

    const { navigation } = props;
    const onFormUpdate = useCallback(async () => {
        await addReport();
        navigation.dispatch(StackActions.pop());
    }, [addReport, navigation]);

    return (
        <KeyboardAvoidingView style={styles.screen} behavior='height' keyboardVerticalOffset={100}>
            <ScrollView style={styles.scroll}>
                <View>
                    <CameraPicker />

                    <InputContainer label="Cuando viste la infraccion" iconName="time-outline" iconColor={colors.primary}>
                        <DatePicker value={date} onDateChange={newDate => setDate(newDate)} />
                    </InputContainer>

                    <InputContainer label="Donde viste la infraccion?" iconName="locate-outline" iconColor={colors.primary}>
                        <LocationPicker onMapOpen={() => {props.navigation.navigate('Map', {location: location?.location})}} onLocationChange={(res:FullLocation) => {setLocation(res)}} route={props.route} />
                    </InputContainer>

                    <Input 
                        label="Describe lo que viste"
                        value={description}
                        onChangeText={(text:string) => {setDescription(text)}}
                        numberOfLines={4}
                        multiline
                    />
                </View>
            </ScrollView>
            <View style={styles.buttonContainer}>
                { !isLoading? (
                    <CustomButton title="LEVANTAR DENUNCIA" onPress={onFormUpdate} />
                ) : (
                    <ActivityIndicator size='small' color={colors.accent} />
                )}
                
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    scroll: {
        flex: 1,
        margin: 20,
    },
    buttonContainer: {
        marginTop: 20,
    },
});

export default AddReportScreen;
