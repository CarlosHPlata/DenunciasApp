import React from 'react';
import { StyleSheet, Text } from 'react-native';

import { Report } from '../../store/types/report';
import AdaptativeTouchable from '../UI/AdaptativeTouchable';
import Card from '../UI/Card';

const ReportCard = ({report, onPress}: {report:Report, onPress:any}) => {

    return (
        <Card style={styles.reportCard}>
            <AdaptativeTouchable style={styles.touchableComponent} onPress={onPress}>
                <Text>Date: {report.date.toISOString()}</Text>
                <Text>Location: {report.location}</Text>
                <Text>{report.description}</Text>
            </AdaptativeTouchable>
        </Card>
    );
};

const styles = StyleSheet.create({
    reportCard: {
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 0,
    },
    touchableComponent: {
        padding: 20,
    }
});

export default ReportCard;