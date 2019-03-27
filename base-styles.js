import {StyleSheet} from 'react-native'
import * as colors from './utils/colors'

export function SecondaryButtonStyles(color = colors.positive) {
    const styles = StyleSheet.create({
        button: {
            borderRadius: 3,
            color: colors.white,
            paddingHorizontal: 10,
            paddingVertical: 5,
            borderWidth: 2,
            borderStyle: 'solid',
            borderColor: color,
            marginHorizontal: 5
        }
    })

    return styles.button
}

export function metricCounter() {
    const styles = StyleSheet.create({
        metricCounter: {
            width: 85,
            justifyContent: 'center',
            alignItems: 'center'
        },
        valueText: {
            fontSize: 24,
            textAlign: 'center'
        },
        unit: {
            fontSize: 18,
            color: colors.gray
        }
    })

    return {
        metricCounter: styles.metricCounter,
        metricValue: styles.valueText,
        unit: styles.unit
    }
}

export function dateHeader() {
    const styles = StyleSheet.create({
        dateHeader: {
            color: colors.purple,
            fontSize: 25
        }
    })

    return styles.dateHeader
}