import React from 'react'
import {View, Text, Slider, StyleSheet} from 'react-native'
import * as baseStyles from '../base-styles'

export default function CustomSlider({max, step, unit, onChange, value}) {
    return (
        <View style={styles.container}>
            <Slider
                step={step}
                maximumValue={max}
                minimumValue={0}
                value={value}
                onValueChange={onChange}
                style={{flex: 1}}
            />

            <View style={styles.metricCounter}>
                <Text style={styles.metricValue}>{value}</Text>
                <Text style={styles.metricUnit}>{unit}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
   container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    metricCounter: baseStyles.metricCounter().metricCounter,
    metricValue: baseStyles.metricCounter().metricValue,
    metricUnit: baseStyles.metricCounter().unit
})