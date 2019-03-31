import React from 'react'
import {Text, View, Button, StyleSheet, Platform} from 'react-native'
import {Ionicons} from '@expo/vector-icons'
import {connect} from 'react-redux'
import {NavigationActions} from 'react-navigation'

import {clearLocalNotification, getMetricMetaInfo, setLocalNotification, timeToString} from '../utils/helpers'
import * as colors from '../utils/colors'
import {saveEntry, removeEntry} from '../utils/api'

import CustomSlider from './slider'
import Stepper from './stepper'
import DateHeader from './date'
import TextButton from './text-button'
import {addEntry} from '../actions'


class AddEntry extends React.Component {
    state = {
        walk: 0,
        bike: 0,
        swim: 0,
        sleep: 0,
        eat: 0
    }

    increment = (metric) => {
        const {max, step} = getMetricMetaInfo(metric)

        this.setState(state => {
            const count = state[metric] + step
            return {
                ...state,
                [metric]: count > max ? max : count
            }
        })
    }

    decrement = (metric) => {
        const {step} = getMetricMetaInfo(metric)

        this.setState(state => {
            const count = state[metric] - step
            return {
                ...state,
                [metric]: count < 0 ? 0 : count
            }
        })
    }

    slide = (metric, value) => {
        this.setState({[metric]: value})
    }

    submit = () => {
        const key = timeToString()
        const entry = this.state

        this.props.dispatch(addEntry({
            [key]: entry
        }))

        this.setState({
            walk: 0,
            bike: 0,
            swim: 0,
            sleep: 0,
            eat: 0
        })

        this.toHome()

        clearLocalNotification()
            .then(setLocalNotification)

        saveEntry({key, entry})
            .catch(err => console.log(err))
        alert('submitted')
    }

    reset = () => {
        const key = timeToString()

        this.props.dispatch(addEntry({
            [key]: {
                today: "Don't forget to log today!"
            }
        }))

        this.toHome()

        setLocalNotification()
        removeEntry(key)
        alert('Removed!')
    }

    toHome = () => {
        this.props.navigation.dispatch(NavigationActions.back({
            key: 'AddEntry'
        }))
    }

    render() {
        const metrics = getMetricMetaInfo()


        if (this.props.alreadyLogged) {
            return (
                <View style={styles.center}>
                    <Ionicons name={Platform.OS === 'ios' ? 'ios-happy-outline' : 'md-happy'} size={100}/>
                    <Text>You already logged your hours for today!</Text>
                    <TextButton onPress={this.reset}>Reset</TextButton>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <DateHeader date={(new Date()).toLocaleDateString()}/>
                {Object.keys(metrics).map((metric) => {
                    const {getIcon, type, ...rest} = metrics[metric]
                    let value = this.state[metric]

                    return (
                        <View key={metric} style={styles.row}>
                            {getIcon()}
                            {type === 'slider'
                                ? <CustomSlider style={{flex: 2}} value={value}
                                                onChange={(value) => this.slide(metric, value)} {...rest}/>
                                : <Stepper style={{flex: 2}} value={value} onIncrement={() => this.increment(metric)}
                                           onDecrement={() => this.decrement(metric)} {...rest}/>
                            }
                        </View>
                    )
                })}
                <Button title="Submit" onPress={this.submit} color={colors.positive}
                        accessibilityLabel="Submit button"/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.white
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 30,
        marginLeft: 30
    }
})

function mapStateToProps(state) {
    const key = timeToString()
    return {
        state,
        alreadyLogged: state[key] && typeof state[key].today === 'undefined'
    }
}

export default connect(mapStateToProps)(AddEntry)