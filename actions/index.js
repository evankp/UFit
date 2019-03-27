export const GET_ENTRIES = 'GET_ENTRIES'
export const ADD_ENTRY = 'ADD_ENTRY'

export function getEntries(entries) {
    return {
        type: GET_ENTRIES,
        entries
    }
}

export function addEntry(entry) {
    return {
        type: ADD_ENTRY,
        entry
    }
}