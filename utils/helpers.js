import React from 'react'

import {StyleSheet, View} from 'react-native'
import {FontAwesome, MaterialIcons, MaterialCommunityIcons} from '@expo/vector-icons'
import * as colors from './colors'

export function isBetween(num, x, y) {
    return num >= x && num <= y
}

export function calculateDirection(heading) {
    let direction = ''

    if (isBetween(heading, 0, 22.5)) {
        direction = 'North'
    } else if (isBetween(heading, 22.5, 67.5)) {
        direction = 'North East'
    } else if (isBetween(heading, 67.5, 112.5)) {
        direction = 'East'
    } else if (isBetween(heading, 112.5, 157.5)) {
        direction = 'South East'
    } else if (isBetween(heading, 157.5, 202.5)) {
        direction = 'South'
    } else if (isBetween(heading, 202.5, 247.5)) {
        direction = 'South West'
    } else if (isBetween(heading, 247.5, 292.5)) {
        direction = 'West'
    } else if (isBetween(heading, 292.5, 337.5)) {
        direction = 'North West'
    } else if (isBetween(heading, 337.5, 360)) {
        direction = 'North'
    } else {
        direction = 'Calculating'
    }

    return direction
}

export function timeToString(time = Date.now()) {
    const date = new Date(time)
    const todayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    return todayUTC.toISOString().split('T')[0]
}

const styles = StyleSheet.create({
  iconContainer: {
    padding: 5,
    borderRadius: 8,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 20
  },
})

export function getMetricMetaInfo(metric) {
    const info = {
        walk: {
            name: 'Walk',
            max: 50,
            unit: 'miles',
            step: 1,
            type: 'steppers',
            getIcon() {
                return (
                    <View style={[styles.iconContainer, {backgroundColor: colors.red}]}>
                        <MaterialIcons
                            name="directions-run"
                            color={colors.white}
                            size={35}/>
                    </View>
                )
            }
        },
        bike: {
            name: 'Bike',
            max: 100,
            unit: 'miles',
            step: 1,
            type: 'steppers',
            getIcon() {
                return (
                    <View style={[styles.iconContainer, {backgroundColor: colors.green}]}>
                        <MaterialCommunityIcons
                        name="bike"
                        color={colors.white}
                        size={35}/>
                    </View>
                )
            }
        },

        swim: {
            name: 'Run',
            max: 9900,
            unit: 'meters',
            step: 1,
            type: 'steppers',
            getIcon() {
                return (
                    <View style={[styles.iconContainer, {backgroundColor: colors.purple}]}>
                        <MaterialCommunityIcons
                        name="swim"
                        color={colors.white}
                        size={35}/>
                    </View>
                )
            }
        },

        sleep: {
            name: 'Sleep',
            max: 24,
            unit: 'hours',
            step: 1,
            type: 'slider',
            getIcon() {
                return (
                    <View style={[styles.iconContainer, {backgroundColor: colors.blue}]}>
                        <FontAwesome
                        name="bed"
                        color={colors.white}
                        size={35}/>
                    </View>
                )
            }
        },

        eat: {
            name: 'Eat',
            max: 10,
            unit: 'rating',
            step: 1,
            type: 'slider',
            getIcon() {
                return (
                    <View style={[styles.iconContainer, {backgroundColor: colors.lightPurp}]}>
                        <MaterialCommunityIcons
                        name="food"
                        color={colors.white}
                        size={35}/>
                    </View>
                )
            }
        }

    }

    if (metric) return info[metric]

    return info
}