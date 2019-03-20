import React from 'react'
import {Text, TouchableOpacity} from 'react-native'
import {positive} from "../utils/colors"

export default function TextButton({children, onPress, color}) {
    return (
        <TouchableOpacity onPress={onPress}>
            <Text style={{color: color ? color : positive}}>{children}</Text>
        </TouchableOpacity>
    )
}