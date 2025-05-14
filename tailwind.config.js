export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}", 
    ],
    theme: {
      extend: {
        backgroundImage: {
          'sidebar-desktop': "url('/src/assets/images/bg-sidebar-desktop.svg')", 
        },
      },
    },
    plugins: [],
  }