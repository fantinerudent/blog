const defaultTheme = require("tailwindcss/defaultTheme")

module.exports = {
  theme: {
    colors: {
      transparent: "transparent",
      current: "currentColor",
      yellow: "#ffc857",
      orange: "#e9724c",
      red: "#c5283d",
      brown: "#481d24",
      blue: "#255f85",
      lightYellow: "#ffebc2",
      // Configure your color palette here
    },
extend: {
  fontFamily: {
    serif: ["Merriweather", ...defaultTheme.fontFamily.serif],
      sans: ["Montserrat", ...defaultTheme.fontFamily.sans],
      },
},
  },
variants: { },
plugins: [],
}
