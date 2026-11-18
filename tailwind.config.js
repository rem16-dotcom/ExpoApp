/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./src/app/**/*.{ts,tsx}", "./src/components/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      // Hunnypie palette
      colors: {
        primary: "#FF8FB1",
        soft: "#FFC2D5",
        light: "#FFF0F5",
        accent: "#F45B91",
        card: "#FFF7FA",
        ink: "#262126",
        muted: "#8C8188",
      },
    },
  },
  plugins: [],
}
