import React from 'react'
import {Text, View, StatusBar, StyleSheet, Platform} from 'react-native'
import {createStore, applyMiddleware} from 'redux'
import {Provider} from 'react-redux'
import {createAppContainer, createMaterialTopTabNavigator, createStackNavigator} from 'react-navigation'
import {FontAwesome, Ionicons} from '@expo/vector-icons'
import {Constants} from 'expo'

import AddEntry from './components/add-entry'
import History from './components/history'
import EntryDetail from './components/entry-detail'

import entries from './reducers'
import logger from './middleware/logger'
import * as colors from './utils/colors'

const store = createStore(entries)

const Tabs = createMaterialTopTabNavigator({
    history: {
        screen: History,
        navigationOptions: {
            tabBarLabel: 'History',
            tabBarIcon: ({tintColor}) => <Ionicons name='ios-bookmarks' size={30} color={tintColor}/>,
            title: null
        }
    },

    addEntry: {
        screen: AddEntry,
        navigationOptions: {
            tabBarLabel: 'Add Entry',
            tabBarIcon: ({tintColor}) => <FontAwesome name='plus-square' size={30} color={tintColor}/>
        }
    }
}, {
    tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? colors.purple : colors.white,
        style: {
            height: 56,
            backgroundColor: Platform.OS === 'ios' ? colors.white: colors.purple,
            shadowColor: 'rgba(0, 0, 0, 0.24)',
            shadowOffset: {
                width: 0,
                height: 3
            },
            shadowRadius: 6,
            shadowOpacity: 1
        }
    }
})

const MainNavigtation = createStackNavigator({
    home: {
        screen: Tabs,
        navigationOptions: {
            header: null
        }
    },

    entryDetail: {
        screen: EntryDetail,
        navigationOptions: {
            headerTintColor: colors.white,
            headerStyle: {
                backgroundColor: colors.purple
            }
        }
    }
})

const AppContainer = createAppContainer(MainNavigtation)

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <View style={{backgroundColor: colors.purple, height: Constants.statusBarHeight}}>
                    <StatusBar barStyle="light-content" translucent hidden={false}/>
                </View>
                <View style={{flex: 1}}>
                    <AppContainer/>
                </View>
            </Provider>
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
