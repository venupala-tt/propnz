/** @type {import('tailwindcss').Config} */
module.exports = {

  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
   './app/**/*.{js,ts,jsx,tsx,mdx}',

  ],


  theme: {
    extend: {
        
      keyframes: {
        fadeInBounce: {
          "0%": { opacity: 0, transform: "translateY(10px) scale(0.9)" },
          "60%": { opacity: 1, transform: "translateY(-3px) scale(1.05)" },
          "80%": { transform: "translateY(1px) scale(0.98)" },
          "100%": { transform: "translateY(0) scale(1)" },
        },
        gradientWave: {
          "0%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
          "100%": { backgroundPosition: "0% 50%" },
        },
      },
      animation: {
        fadeInBounce: "fadeInBounce 0.8s ease-out forwards",
        gradientWave: "gradientWave 3s ease infinite",
      },
      dropShadow: {
        youtube: "0 0 6px rgba(255, 0, 0, 0.6)",
        instagram: "0 0 6px rgba(225, 48, 108, 0.6)",
        facebook: "0 0 6px rgba(59, 89, 152, 0.6)",
        linkedin: "0 0 6px rgba(0, 119, 181, 0.6)",
      },
    },
  },
  plugins: [],
};


