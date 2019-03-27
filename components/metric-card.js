import React from 'react'
import {View, Text, StyleSheet} from 'react-native'
import DateHeader from './date'
import {getMetricMetaInfo} from '../utils/helpers'
import * as colors from '../utils/colors'

const MetricCard = ({date, metrics}) => {
    return (
        <View>
            {date && <DateHeader date={date}/>}
            {Object.keys(metrics).map((metric) => {
                const {getIcon, name, unit, backgroundColor} = getMetricMetaInfo(metric)
                return (
                    <View style={styles.metric} key={metric}>
                        {getIcon()}
                        <View>
                            <Text style={{fontSize: 20}}>
                                {name}
                            </Text>
                            <Text style={{fontSize: 16, color: colors.gray}}>
                                {metrics[metric]} {unit}
                            </Text>
                        </View>
                    </View>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
  metric: {
    flexDirection: 'row',
    marginTop: 12
  },
})

export default MetricCard