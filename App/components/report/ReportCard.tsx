import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import { Report } from '../../store/types/report';
import AdaptativeTouchable from '../UI/AdaptativeTouchable';
import Card from '../UI/Card';
import MapPreview from '../UI/MapPreview';

const ReportShortCard = ({report, onToggle}: {report:Report, onToggle:() => void}) => {
    return (
        <View>
            <View style={[styles.paddedView, styles.withBorderBottom]}>
                <Text>{report.state}</Text>
                <Text>Fecha: {report.date.toISOString().split('T')[0]}</Text>
                <Text>Lugar: {report.location?.address}</Text>
            </View>
            <AdaptativeTouchable style={styles.paddingShort} onPress={onToggle}>
                <View style={styles.expandContainer}>
                    <Text style={styles.linkText}>Ver mas</Text>
                    <Ionicons name='caret-down-outline' size={14} color='blue'/>
                </View>
            </AdaptativeTouchable>
        </View>
    );
};

const ReportLongCard = ({report, onToggle}: {report:Report, onToggle:() => void}) => {
    return (
        <View>
            <View style={[styles.paddedView, styles.withBorderBottom]}>
                <Text>{report.state}</Text>
                <Text>Fecha: {report.date.toISOString().split('T')[0]}</Text>
                
                <Text>Descripcion de lo sucedido: {report.description}</Text>

                <MapPreview location={{latitude: report.location?.location.latitude, longitude: report.location?.location.longitude}} onPress={()=>{}} >
                    <Text>Loading</Text>
                </MapPreview>
            </View>
            <AdaptativeTouchable style={styles.paddingShort} onPress={onToggle}>
                <View style={styles.expandContainer}>
                    <Text style={styles.linkText}>Ver menos</Text>
                    <Ionicons name='caret-up-outline' size={14} color='blue'/>
                </View>
            </AdaptativeTouchable>
        </View>
    );
}

const ReportCard = ({report, onPress}: {report:Report, onPress:any}) => {
    const [ shortView, setShortView ] = useState(true);

    return (
        <Card style={styles.reportCard}>
            {shortView? (
                <ReportShortCard report={report} onToggle={() => {setShortView(prev => !prev)}} />
            ) : (
                <ReportLongCard report={report} onToggle={() => {setShortView(prev => !prev)}} />
            )}
        </Card>
    );
};

const styles = StyleSheet.create({
    reportCard: {
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 0,
    },
    paddedView: {
        padding: 20,
    },
    paddingShort: {
        padding: 10,
    },
    withBorderBottom: {
        borderBottomColor: "#ccc",
        borderBottomWidth: 1,
    },
    expandContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    linkText: {
        color: 'blue'
    }
});

export default ReportCard;