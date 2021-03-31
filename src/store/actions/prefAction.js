export function setTheme(theme) {
    return {
        type: 'SET_APP_THEME',
        theme
    }
}

export function setAppMode(mode) {
    return {
        type: 'SET_APP_MODE_THEME',
        mode
    }
}

export function toggleTemp() {
    return {
        type: 'SET_TEMP_TOGGLE'
    }
}