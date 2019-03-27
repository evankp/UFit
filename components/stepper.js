import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet, TextInput} from 'react-native'
import {AntDesign} from '@expo/vector-icons'
import * as colors from '../utils/colors'
import * as baseStyles from '../base-styles'

export default function Stepper({step, max, value, unit, onIncrement, onDecrement}) {
    return (
        <View style={styles.container}>
            <View style={styles.stepperContainer}>
                <TouchableOpacity onPress={onDecrement} style={baseStyles.SecondaryButtonStyles(colors.blue)}>
                    <AntDesign name='minus' size={30} color={colors.blue}/>
                </TouchableOpacity>

                <TouchableOpacity onPress={onIncrement} style={baseStyles.SecondaryButtonStyles(colors.blue)}>
                    <AntDesign name='plus' size={30} color={colors.blue}/>
                </TouchableOpacity>
            </View>

            <View style={baseStyles.metricCounter().metricCounter}>
                <Text style={baseStyles.metricCounter().metricValue}>{value}</Text>
                <Text style={baseStyles.metricCounter().unit}>{unit}</Text>
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
    stepperContainer: {
        flex: 1,
        flexDirection: 'row'
    }
})