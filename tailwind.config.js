/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,ts,tsx,vue}', // Scan all HTML, JavaScript, TypeScript, and Vue files inside the src directory
    './public/index.html', // Include the index.html file in the public directory
    // Add more paths as needed for your project structure
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
