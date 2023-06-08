module.exports = {
    mode: 'jit',
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: "media",
    theme: {
        extend: {
            colors: {
                'primary-color': '#636A5B',
                'secondary-color': '#D9E7CB',
            },
            spacing: {
                'margin-elements': '1rem',
                'text-between': '1rem',
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}


