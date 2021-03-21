import React from 'react';
import { StyleSheet, View, Text, FlatList, Button, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../store/types/root';

import { Report } from '../store/types/report';
import * as reportActions from '../store/actions/report';
import useLoadWithAction from '../hooks/useLoaWithAction';

import ReportCard from '../components/report/ReportCard';
import { useTheme } from '@react-navigation/native';
import CustomButton from '../components/UI/CustomButton';
import useAsyncActionDispatcher from '../hooks/useAsyncActionDispatcher';

const HomeScreen = (props:any) => {
    const reports: Report[] = useSelector( (state:RootState) => state.reports.userReports );
    const [isLoading, error] = useLoadWithAction(reportActions.fetchReports);

    const colors:any = useTheme().colors;

    const [fetchReports, loadingReports, errorReports] = useAsyncActionDispatcher(reportActions.fetchReports, []);

    if (isLoading){
        return (
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                <ActivityIndicator size="small" color={colors.accent} />
            </View>
        );
    }

    return (
        <View style = { styles.screen }>
            <FlatList 
                style = { styles.screen }
                data = { reports }
                onRefresh={fetchReports}
                refreshing={loadingReports}
                renderItem = { itemData => <ReportCard onPress={() => { console.log('touch me senpai') }} report={itemData.item} />}
            /> 
            <CustomButton title='Haz una Denuncia' onPress={() => { props.navigation.navigate('AddReport') }} />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    reportCard: {
        marginHorizontal: 0,
        marginVertical: 10,
    },

});

export default HomeScreen