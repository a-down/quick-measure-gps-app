/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./providers/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontSize: {
      xs: ['14px', '18px'],
      sm: ['16px', '21px'],
      base: ['18px', '24px'],
      lg: ['20px', '27px'],
      xl: ['22px', '30px'],
    },
    fontFamily: {
      regular: ['Jost_400Regular'],
      medium: ['Jost_500Medium'],
      semibold: ['Jost_600SemiBold'],
      bold: ['Jost_700Bold'],
    },
    extend: {
      colors: {
        'green-1': "#E7F8E6",
        'green-2': "#C9E9C8",
        'green-3': "#AED6A9",
        'green-4': "#8CC185",
        'green-5': "#6DAB64",
        'green-6': "#558E4B",
        'green-7': "#477F3C",
        'green-8': "#3A7032",
        'green-9': "#2B561F",
        'green-10': "#1D3F13",
        'gray-1': "#F7F7F7",
        'gray-2': "#E1E1E1",
        'gray-3': "#CECECE",
        'gray-4': "#B1B1B1",
        'gray-5': "#9F9F9F",
        'gray-6': "#7E7E7E",
        'gray-7': "#626262",
        'gray-8': "#515151",
        'gray-9': "#3B3B3B",
        'gray-10': "#222222",
      }
    },
  },
  plugins: [],
}
