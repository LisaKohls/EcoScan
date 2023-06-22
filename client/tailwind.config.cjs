module.exports = {
    mode: 'jit',
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: "media",
    theme: {
        extend: {
            colors: {
                'primary-color': '#636A5B',
                'secondary-color': '#acbd9c',
                'secondary-light': '#c9d7ba',
                'secondary-dark': '#424b39',
            },
            spacing: {
                'margin-elements': '1rem',
                'text-between': '1rem',
            },
            screens: {
                'sm': '576px',
                // => @media (min-width: 576px) { ... }

                'md': '960px',
                // => @media (min-width: 960px) { ... }

                'lg': '1440px',
                // => @media (min-width: 1440px) { ... }
            },
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
}


