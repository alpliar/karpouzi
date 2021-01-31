// const colors = require('tailwindcss/colors');

// tailwind.config.js
module.exports = {
    purge: [
        // Use *.tsx if using TypeScript
        './pages/**/*.{js,ts,jsx,tsx}',
        './components/**/*.{js,ts,jsx,tsx}'
    ],
    darkMode: 'media', // or false, 'media' or 'class'
    theme: {
        // colors: {
        //     gray: colors.coolGray,
        //     blue: colors.lightBlue,
        //     red: colors.rose,
        //     pink: colors.fuchsia,
        //     white: colors.white
        // },
        fontFamily: {
            sans: ['Graphik', 'sans-serif'],
            serif: ['Merriweather', 'serif'],
            mono: ['monospace']
        },
        extend: {
            spacing: {
                128: '32rem',
                144: '36rem'
            },
            borderRadius: {
                '4xl': '2rem'
            }
        },
        container: {
            center: true
        }
    },
    variants: {
        extend: {}
    },
    plugins: []
};
