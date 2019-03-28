import React from 'react'
import {View, StyleSheet, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'

import {getItem, removeEntry} from '../utils/api'
import {timeToString} from '../utils/helpers'
import {addEntry} from '../actions'

import MetricCard from './metric-card'
import * as colors from '../utils/colors'
import TextButton from './text-button'

class EntryDetail extends React.Component {
    static navigationOptions = ({navigation}) => {
        const {entryId} = navigation.state.params


        const year = entryId.slice(0, 4)
        const month = entryId.slice(5, 7)
        const day = entryId.slice(8)

        return {
            title: `${month}/${day}/${year}`
        }
    }

    state = {
        metrics: undefined
    }

    componentDidMount() {
        const {entryId} = this.props.navigation.state.params
        getItem(entryId).then(data => this.setState({metrics: data}))
    }

    resetEntry = () => {
        const {remove, goBack, entryId} = this.props

        remove()
        goBack()
        removeEntry(entryId)
    }

    shouldComponentUpdate(nextProps) {
        return nextProps.metrics !== null && !nextProps.metrics.today
    }

    render() {
        const {entryId} = this.props.navigation.state.params

        return (
            <View style={styles.container}>
                <MetricCard metrics={this.props.metrics}/>
                <TextButton onPress={this.resetEntry} color={colors.negative} containerStyles={{flex: 1}}>
                    Reset
                </TextButton>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 15,
        backgroundColor: colors.white
    }
})

function mapStateToProps(state, {navigation}) {
    const {entryId} = navigation.state.params

    return {
        entryId,
        metrics: state[entryId]
    }
}

function mapDispatchToProps(dispatch, {navigation}) {
    const {entryId} = navigation.state.params

    return {
        remove: () => dispatch(addEntry({
            [entryId]: timeToString() === entryId
                ? {today: "Don't forget to log today"}
                : null
        })),
        goBack: () => navigation.goBack(),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(EntryDetail)