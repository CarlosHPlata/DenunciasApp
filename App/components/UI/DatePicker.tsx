import React, { RefObject, useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const DatePicker = (props:{ value?: Date, onDateChange?: (date:Date) => void, nextInput?: RefObject<TextInput>}) => {
    const [ date, setDate ] = useState(props.value? props.value : new Date());

    const [ day, setDay ] = useState(('0' + date.getDate()).slice(-2));
    const [ month, setMonth ] = useState(('0' + (date.getMonth() + 1)).slice(-2));
    const [ year, setYear ] = useState(date.getFullYear()+'');

    const DayInput = useRef<TextInput>(null);
    const YearInput = useRef<TextInput>(null);

    const onDayInputBlur = () => {
        let value = day;
        
        if (value.length < 2 && value.length != 0) {
            while (value.length < 2) {
                value = '0'+value;
            }
        }

        if (parseInt(value) <= 0) {
            value='01';
        }

        if (parseInt(value) > 31) {
            value='31';
        }

        setDay(value);
        onDateChange(value, month, year);
    }

    const onMonthBlur = () => {
        let value = month;

        if (value.length < 2 && value.length != 0) {
            while (value.length < 2) {
                value = "0"+value;
            }
        }

        if (parseInt(value) <= 0){
            value = "01";
        }

        if (parseInt(value) > 12) {
            value = "12";
        }

        setMonth(value);
        onDateChange(day, value, year);
    };

    const onyearBlur = () => {
        let value = year;
        
        if (value.length < 4 && value.length != 0) {
            value = new Date().getFullYear() + '';
        }

        setYear(value);
        onDateChange(day, month, value);
    }

    const onDateChange = (day: string, month: string, year: string) => {
        const daysInMonth = new Date(parseInt(year), parseInt(month), 0).getDate();
        if (parseInt(day) > daysInMonth) {
            day = daysInMonth+'';
            setDay(day);
        }

        const newDate = new Date(`${month}/${day}/${year}`);
        setDate(newDate);
        
        if (props.onDateChange){
            props.onDateChange(newDate);
        }
    }

    return (
        <View style={styles.dateContainer}>
            <TextInput 
                keyboardType="numeric"
                maxLength={2}
                style={styles.input} 
                placeholder="MM"
                value={month}
                onChangeText={text=>setMonth(text)}
                onBlur={onMonthBlur}
                returnKeyType="next"
                onSubmitEditing={() => {DayInput.current?.focus()}}
            />
            <Text style={{marginTop: 3}}>/</Text>

            <TextInput 
                keyboardType="numeric"
                maxLength={2}
                style={styles.input}
                placeholder="DD"
                value={day}
                onChangeText={text=>setDay(text)}
                onBlur={onDayInputBlur}
                returnKeyType="next"
                onSubmitEditing={() => {YearInput.current?.focus()}}
                ref={DayInput}
            />

            <Text style={{marginTop: 3}}>/</Text>

            <TextInput 
                keyboardType="numeric"
                maxLength={4}
                style={styles.input}
                placeholder="YYYY"
                value={year}
                onChangeText={text=>setYear(text)}
                onBlur={onyearBlur}
                returnKeyType="next"
                ref={YearInput}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    dateContainer: {
        flexDirection:"row",
    },
    input: {
        marginHorizontal: 5,
    },
});

export default DatePicker;