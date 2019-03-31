import React from 'react'
import {View, Text, StyleSheet, Platform, ActivityIndicator, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import FitnessCalender from 'udacifitness-calendar'
import {AppLoading} from 'expo'

import {timeToString} from '../utils/helpers'
import * as colors from '../utils/colors'
import {clearStorage, getList, saveEntry} from '../utils/api'
import {getEntries} from '../actions'
import DateHeader from './date'
import MetricCard from './metric-card'

class History extends React.Component {
    state = {
        ready: false
    }

    componentDidMount() {
        const {dispatch} = this.props
        getList().then(entries => dispatch(getEntries(entries)))
            .then(({entries}) => {
                if (!entries[timeToString()]) {
                    saveEntry({
                        [timeToString()]: 'Don\'t forget to log today!'
                    })
                }
            })
            .then(() => this.setState({ready: true}))
    }

    renderItem = ({today, ...metrics}, formattedDate, key) => (
        <View style={styles.item}>
            {today
                ? <Text style={styles.noDataText}>{today}</Text>
                : <TouchableOpacity onPress={() => this.props.navigation.navigate('entryDetail', {entryId: key})}>
                    <MetricCard date={formattedDate} metrics={metrics}/>
                </TouchableOpacity>
            }
        </View>
    )

    renderEmptyItem = (formattedDate) => (
        <View style={styles.item}>
            <DateHeader date={formattedDate}/>
            <Text style={styles.noDataText}>You didn't fill out any data for this day.</Text>
        </View>
    )

    render() {

        if (!this.state.ready) {
            return <ActivityIndicator size="large"/>
        }

        return (
            <FitnessCalender
                items={this.props.entries}
                renderItem={this.renderItem}

                renderEmptyDate={this.renderEmptyItem}
            />
        )
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: colors.white,
        borderRadius: Platform.OS === 'ios' ? 16 : 2,
        padding: 20,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 17,
        justifyContent: 'center',
        shadowRadius: 3,
        shadowOpacity: 0.8,
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
            width: 0,
            height: 3
        },
    },
    noDataText: {
        fontSize: 15,
        paddingTop: 20,
        paddingBottom: 20
    }
})

function mapStateToProps(entries) {
    return {
        entries
    }
}

export default connect(mapStateToProps)(History)