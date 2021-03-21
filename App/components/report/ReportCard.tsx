import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Ionicons} from '@expo/vector-icons';

import { Report } from '../../store/types/report';
import AdaptativeTouchable from '../UI/AdaptativeTouchable';
import Card from '../UI/Card';
import MapPreview from '../UI/MapPreview';
import { getStateColor } from '../../../constants/Colors';
import { useTheme } from '@react-navigation/native';

const ReportShortCard = ({report, stateColor, colors, onToggle}: {report:Report, stateColor:string, colors:any, onToggle:() => void}) => {

    return (
        <View>
            <View style={[styles.paddedView, styles.withBorderBottom]}>
                <Text style={{ ...styles.state, color: stateColor}}>{report.state}</Text>
                <Text style={styles.notResaltedText}>Fecha: {report.date.toISOString().split('T')[0]}</Text>
                <Text>Lugar: {report.location?.address}</Text>
            </View>
            <AdaptativeTouchable style={styles.paddingShort} onPress={onToggle}>
                <View style={styles.expandContainer}>
                    <Text style={{ ...styles.linkText, color: colors.primary}}>Ver mas</Text>
                    <Ionicons name='caret-down-outline' size={14} color={colors.primary}/>
                </View>
            </AdaptativeTouchable>
        </View>
    );
};

const ReportLongCard = ({report, stateColor, colors, onToggle}: {report:Report, stateColor:string, colors:any, onToggle:() => void}) => {
    return (
        <View>
            <View style={[styles.paddedView, styles.withBorderBottom]}>
                <Text style={{ ...styles.state, color: stateColor}}>{report.state}</Text>
                <Text style={styles.notResaltedText}>Fecha: <Text style={{fontWeight: 'bold'}}>{report.date.toISOString().split('T')[0]}</Text></Text>

                <View style={styles.descriptionContainer}>
                    <Text style={styles.notResaltedText}>Descripcion de lo sucedido:</Text>
                    <Text>{report.description}</Text>
                </View>

                <MapPreview location={{latitude: report.location?.location.latitude, longitude: report.location?.location.longitude}} onPress={()=>{}} >
                    <Text>Loading</Text>
                </MapPreview>
            </View>
            <AdaptativeTouchable style={styles.paddingShort} onPress={onToggle}>
                <View style={styles.expandContainer}>
                <Text style={{ ...styles.linkText, color: colors.primary}}>Ver menos</Text>
                    <Ionicons name='caret-down-outline' size={14} color={colors.primary}/>
                </View>
            </AdaptativeTouchable>
        </View>
    );
}

const ReportCard = ({report, onPress}: {report:Report, onPress:any}) => {
    const [ shortView, setShortView ] = useState(true);
    
    const { colors } = useTheme();

    const color = getStateColor(report.state+'');

    return (
        <Card style={{...styles.reportCard, borderLeftColor: color}}>
            {shortView? (
                <ReportShortCard report={report} stateColor={color} colors={colors} onToggle={() => {setShortView(prev => !prev)}} />
            ) : (
                <ReportLongCard report={report} stateColor={color} colors={colors}  onToggle={() => {setShortView(prev => !prev)}} />
            )}
        </Card>
    );
};

const styles = StyleSheet.create({
    state: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    descriptionContainer: {
        marginVertical: 20
    },
    notResaltedText: {
        color: '#ccc'
    },
    reportCard: {
        marginHorizontal: 0,
        marginVertical: 5,
        padding: 0,
        borderLeftWidth: 10,
    },
    paddedView: {
        paddingHorizontal: 20,
        paddingVertical: 20
    },
    paddingShort: {
        paddingHorizontal: 15,
        paddingVertical: 10,
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
        fontWeight: 'bold',
    }
});

export default ReportCard;