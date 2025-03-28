const flowbiteReact = require("flowbite-react/plugin/tailwindcss");

module.exports = {
  mode: 'jit',
  content: ["./src/**/*.{js,jsx,ts,tsx}", ".flowbite-react/class-list.json"],

  theme: {
    extend: {
      fontFamily: {
        calibri: ["Calibri", "sans-serif"],
      },
    },
    plugins: [],
  },

  plugins: [flowbiteReact]
};