// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./index.html",           
    "./*.html"                
  ],
  theme: {
    extend: {
       transitionDelay: ['responsive', 'hover', 'focus'],
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '0' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
      },
    },
  },
}
