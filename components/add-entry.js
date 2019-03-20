import React from 'react'
import {Text, View, Button, StyleSheet} from 'react-native'
import {Ionicons} from '@expo/vector-icons'

import {getMetricMetaInfo, timeToString} from '../utils/helpers'
import * as colors from '../utils/colors'
import {saveEntry, removeEntry, getList, clearStorage} from "../utils/api"

import CustomSlider from "./slider"
import Stepper from "./stepper"
import DateHeader from "./date"
import TextButton from "./text-button"


export default class App extends React.Component {
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
        const { step} = getMetricMetaInfo(metric)

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

        console.log(entry)

        // this.setState({
        //     walk: 0,
        //     bike: 0,
        //     swim: 0,
        //     sleep: 0,
        //     eat: 0
        // })

        saveEntry({key, entry})
        alert('submitted')
    }

    reset = () => {
        const key = timeToString()

        removeEntry(key)
        alert('Removed!')
    }

    render() {
        const metrics = getMetricMetaInfo()
        getList().then(data => console.log(data))

        if (this.props.alreadyLogged) {
            return (
                <View>
                    <Ionicons name='ios-happy' size={100}/>
                    <TextButton onPress={this.reset()}>Reset</TextButton>
                </View>
            )
        }

        return (
            <View>
                <DateHeader date={(new Date()).toLocaleDateString()}/>
                {Object.keys(metrics).map((metric) => {
                    const {getIcon, type, ...rest} = metrics[metric]
                    let value = this.state[metric]

                    return (
                        <View key={metric} style={styles.activity}>
                            <View style={styles.icon}>{getIcon()}</View>
                            {type === 'slider'
                                ? <CustomSlider value={value} onChange={(value) => this.slide(metric, value)} {...rest}/>
                                : <Stepper value={value} onIncrement={() => this.increment(metric)}
                                           onDecrement={() => this.decrement(metric)} {...rest} style={styles.activityForm}/>
                            }
                        </View>
                    )
                })}
                <Button title="Submit" onPress={this.submit} color={colors.positive} accessibilityLabel='Submit button'/>
                <TextButton onPress={this.reset}>Reset</TextButton>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    activity: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch'
    },

    item: {
        flexGrow: 0
    },

    activityForm: {
        flexGrow: 1
    }
})