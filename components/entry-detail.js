import React from 'react'
import {View, Text} from 'react-native'

export default class EntryDetail extends React.Component {
    render() {
        const {entryId} = this.props.navigation.state.params
        return (
            <Text>{entryId}</Text>
        )
    }
}