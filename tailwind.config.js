import winduum from 'winduum/plugin'

export default {
    darkMode: 'class',
    content: [
        './src/**/*.{tsx,jsx}',
        './node_modules/winduum/src/**/*.js'
    ],
    plugins: [
        winduum()
    ]
}
