import React from 'react'
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native'
import {FontAwesome} from '@expo/vector-icons'
import * as colors from '../utils/colors'

export default function Stepper({step, max, value, unit, onIncrement, onDecrement}) {
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={onDecrement}>
                <FontAwesome name='minus' size={30} color={colors.black}/>
            </TouchableOpacity>

            <TouchableOpacity onPress={onIncrement}>
                <FontAwesome name='plus' size={30} color={colors.black}/>
            </TouchableOpacity>

            <View>
                <Text>{value}</Text>
                <Text>{unit}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    }
})