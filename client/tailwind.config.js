/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./pages/**/*.{html,js,jsx}",
    "./components/**/*.{html,js,jsx}",
    "./src/**/*.{html,js,jsx}"
  ],
  theme: {
    extend: {
      aspectRatio: false,
    },
  },
  plugins: [
    import('@tailwindcss/forms'),
    import('@tailwindcss/aspect-ratio')
  ],
}

