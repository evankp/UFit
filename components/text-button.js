import React from 'react'
import {Text, TouchableOpacity} from 'react-native'
import {positive} from "../utils/colors"

export default function TextButton({children, onPress, color, containerStyles}) {
    return (
        <TouchableOpacity onPress={onPress} style={containerStyles}>
            <Text style={{color: color ? color : positive, textAlign: 'center'}}>{children}</Text>
        </TouchableOpacity>
    )
}