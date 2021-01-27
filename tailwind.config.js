// tailwind.config.js
module.exports = {
    purge: [
        // Use *.tsx if using TypeScript
        './pages/**/*.js',
        './components/**/*.js'
    ],
    darkMode: 'media' // or false, 'media' or 'class'
    // ...
};
