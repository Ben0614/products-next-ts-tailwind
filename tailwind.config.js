module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        lg: "1140px",
        xl: "1140px",
        "2xl": "1140px",
      },
      colors: {
        light: {
          blue: "lightblue",
          coral: "lightcoral",
          cyan: "lightcyan",
          goldenrodyellow: "lightgoldenrodyellow",
          gray: "lightgray",
          green: "lightgreen",
          grey: "lightgrey",
          pink: "lightpink",
          salmon: "lightsalmon",
          seagreen: "lightseagreen",
          skyblue: "lightskyblue",
          slategray: "lightslategray",
          slategrey: "lightslategrey",
          steelblue: "lightsteelblue",
          yellow: "lightyellow",
        },
      },
    },
    container: {
      center: true,
    },
  },
  plugins: [],
};
