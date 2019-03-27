import {AsyncStorage} from 'react-native'
import {CALENDAR_STORAGE_KEY, formatCalendarResults} from './_calendar'

export function saveEntry({entry, key}) {
    return AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({
        [key]: entry
    }))
}

export function removeEntry(key) {
    return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
        .then(res => {
            const data = JSON.parse(res)
            data[key] = undefined
            delete data[key]
            AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
                .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
}

export function clearStorage() {
    return AsyncStorage.removeItem(CALENDAR_STORAGE_KEY)
}

export function getItem(key) {
    return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
}

export function getList() {
    return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
        .then(formatCalendarResults)
}