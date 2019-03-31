import React from 'react'
import {View, Text, ActivityIndicator, StyleSheet, TouchableOpacity, Animated} from 'react-native'
import {MaterialCommunityIcons} from '@expo/vector-icons'
import {Location, Permissions} from 'expo'
import {calculateDirection} from '../utils/helpers'


import * as colors from '../utils/colors'

class Live extends React.Component {
    state = {
        coords: null,
        status: null,
        direction: '',
        bounceValue: new Animated.Value(1)
    }

    componentDidMount() {
        // this.askPermission()
        Permissions.getAsync(Permissions.LOCATION)
            .then(({status}) => {
                if (status === 'granted') {
                    return this.setLocation()
                }

                console.log(status)
                this.setState({status})
            })
            .catch(err => {
                console.warn('error getting permission ', err)

                this.setState({status: 'undetermined'})
            })
    }

    askPermission = () => {
        Permissions.askAsync(Permissions.LOCATION)
            .then(({status}) => {
                if (status === 'granted') {
                    return this.setLocation()
                }

                this.setState({status})
            })
            .catch(err => {
                console.warn('error asking permission ', err)

                this.setState({status: 'undetermined'})
            })
    }

    setLocation = () => {
    Location.watchPositionAsync({
      enableHighAccuracy: true,
      timeInterval: 1,
      distanceInterval: 1,
    }, ({ coords }) => {
      const newDirection = calculateDirection(coords.heading)
      const { direction, bounceValue } = this.state

      Animated.sequence([
          Animated.timing(bounceValue, {toValue: 1.84, duration: 200}),
          Animated.spring(bounceValue, {toValue: 1, friction: 4})
      ]).start()

      this.setState(() => ({
        coords,
        status: 'granted',
        direction: newDirection,
      }))
    })
  }

    render() {
        const {coords, status, direction, bounceValue} = this.state

        switch (status) {
            case null:
                return <ActivityIndicator style={{marginTop: 200}} size={80}/>

            case 'undetermined':
                return (
                    <View style={styles.center}>
                        <MaterialCommunityIcons name='alert' size={50}/>
                        <Text style={{textAlign: 'center'}}>You need to enable location services for this feature</Text>
                        <TouchableOpacity style={styles.button} onPress={this.askPermission}>
                            <Text style={styles.buttonText}>Enable</Text>
                        </TouchableOpacity>
                    </View>
                )

            case 'denied':
                return (
                    <View style={styles.center}>
                        <MaterialCommunityIcons name='alert' size={50}/>
                        <Text style={{textAlign: 'center', marginBottom: 10}}>You denied to share your location with
                            this app.
                        </Text>

                        <Text style={{textAlign: 'center'}}>
                            You can fix this by going into your settings and enabling location services for this app.
                        </Text>

                    </View>
                )

            default:
                return (
                    <View style={styles.container}>
                        <View style={styles.directionContainer}>
                            <Text style={styles.header}>Heading</Text>
                            <Animated.Text style={[styles.direction, {transform: [{scale: bounceValue}]}]}>
                                {direction}
                            </Animated.Text>
                        </View>
                        <View style={styles.metricContainer}>
                            <View style={styles.metric}>
                                <Text style={[styles.header, {color: colors.white}]}>
                                    Altitude
                                </Text>
                                <Text style={[styles.subHeader, {color: colors.white}]}>
                                    {Math.round(coords.altitude * 3.2808)} feet
                                </Text>
                            </View>
                            <View style={styles.metric}>
                                <Text style={[styles.header, {color: colors.white}]}>
                                    Speed
                                </Text>
                                <Text style={[styles.subHeader, {color: colors.white}]}>
                                    {(coords.speed *  2.2369).toFixed(1)} MPH
                                </Text>
                            </View>
                        </View>
                    </View>
                )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'space-between'
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 30,
        marginRight: 30,
    },
    button: {
        padding: 10,
        backgroundColor: colors.purple,
        alignSelf: 'center',
        borderRadius: 5,
        margin: 20,
    },
    buttonText: {
        color: colors.white,
        fontSize: 20,
    },

    directionContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    header: {
        fontSize: 35,
        textAlign: 'center',
    },
    direction: {
        color: colors.purple,
        fontSize: 120,
        textAlign: 'center',
    },
    metricContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: colors.purple,
    },
    metric: {
        flex: 1,
        paddingTop: 15,
        paddingBottom: 15,
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 10,
        marginRight: 10,
    },
    subHeader: {
        fontSize: 25,
        textAlign: 'center',
        marginTop: 5,
    },
})

export default Live