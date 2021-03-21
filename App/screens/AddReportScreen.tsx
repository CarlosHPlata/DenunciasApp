import React, { useCallback, useState } from 'react';
import { Button, KeyboardAvoidingView, Platform, StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StackActions } from '@react-navigation/routers';

import AdaptativeTouchable from '../components/UI/AdaptativeTouchable';
import Input from '../components/UI/Input';
import InputContainer from '../components/UI/InputContainer';
import * as ReportActions from '../store/actions/report';
import useAsyncActionDispatcher from '../hooks/useAsyncActionDispatcher';
import LocationPicker from '../components/UI/LocationPicker';
import CustomButton from '../components/UI/CustomButton';
import { useTheme } from '@react-navigation/native';

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

    const [ showDate, setShowDate ] = useState(false);

    const onDateChange = (event:any, selectedDate:Date|undefined) => {
        setShowDate(Platform.OS === 'ios');
        setDate(prev => {
            const newDate = selectedDate || prev; 
            return newDate
        });
    };

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
                <View style={styles.form}>

                    <InputContainer label="Cuando viste la infraccion?" iconName="time-outline" iconColor={colors.primary}>
                        <AdaptativeTouchable style={styles.input} onPress={() => {setShowDate(true)}}> 
                            <Text>{date.toISOString().split('T')[0]}</Text>
                        </AdaptativeTouchable>
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

                    { showDate && (
                        <View>
                            <DateTimePicker 
                                testID="dateTimePicker"
                                value={date}
                                mode='date'
                                is24Hour={true}
                                display="default"
                                onChange={onDateChange}
                            />
                        </View>
                    )}
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
    input: {
        marginTop: 5,
    },
    buttonContainer: {
        marginTop: 20,
    },
    form: {

    },
});

export default AddReportScreen;
