import React from 'react'
import {View, Text, Slider, StyleSheet} from 'react-native'

export default function CustomSlider({max, step, unit, onChange, value}) {
    return (
        <View style={styles.container}>
            <Slider
                step={step}
                maximumValue={max}
                minimumValue={0}
                value={value}
                onValueChange={onChange}
            />

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
        flexDirection: 'row'
    }
})