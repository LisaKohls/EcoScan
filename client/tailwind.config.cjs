module.exports = {
    mode: 'jit',
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: "media",
    theme: {
        extend: {
            colors: {
                'grey-green': '#636A5B',
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}


