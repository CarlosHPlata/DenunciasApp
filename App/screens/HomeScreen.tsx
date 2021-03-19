import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/types/root';

import * as reportActions from '../store/actions/report';
import useLoadWithAction from '../hooks/useLoaWithAction';

const HomeScreen = (props:any) => {
    const reports: string[] = useSelector( (state:RootState) => state.reports.userReports );
    const [isLoading, error] = useLoadWithAction(reportActions.fetchReports);

    if (isLoading){
        return (
            <View><Text>IS LOADING</Text></View>
        );
    }

    return (
        <FlatList 
            data = { reports }
            keyExtractor={item => item}
            renderItem = { itemData => (<View><Text>{itemData.item}</Text></View>)}
        />
    );
};

const styles = StyleSheet.create({

})

export default HomeScreen