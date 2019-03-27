import React from 'react'
import {Text} from 'react-native'
import {dateHeader} from '../base-styles'

export default function DateHeader({date}) {
    return (
        <Text style={dateHeader()}>{date}</Text>
    )
}