import React from 'react'
import {Text, View, StatusBar, StyleSheet} from 'react-native'
import AddEntry from "./components/add-entry"

export default class App extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <StatusBar barStyle = "light-content" hidden = {false}/>
                <AddEntry/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 28,
        paddingHorizontal: 10
    }
})
