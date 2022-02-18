module.exports = {
  purge: {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    safelist: [
      'md:w-52',
      'ml-2',
      'text-green-500'
    ]
  },

  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('https://images.unsplash.com/photo-1498036882173-b41c28a8ba34?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80')",
        booyah: "url('https://images.unsplash.com/photo-1542695556-06d09b331678?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80')",
        giraffe: "url('https://images.unsplash.com/photo-1548506446-86bfddac5620?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80')"
       },
       fontFamily: {
        raisin: ['"Rum Raisin"'],
        roboto: ["Roboto"],
      }
    },
    container: {
      // you can configure the container to be centered
      center: true,

      // or have default horizontal padding
      // padding: '1rem',

      // default breakpoints but with 40px removed
      screens: {
        md: '600px',
        lg: '728px',
        xl: '984px',
        '2xl': '1240px',
        // '2xl': '1496px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    // require('@tailwindcss/line-clamp'),
    // require('@themesberg/flowbite/plugin')
  ],
}
