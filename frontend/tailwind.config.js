/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    theme: {
        extend: {
            colors: {
                cream: "#fffdd0",
                space_cadet: "#00022f",
            },
        },
    },
    plugins: [],
};
