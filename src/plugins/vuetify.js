// Styles
import '@mdi/font/css/materialdesignicons.css'
//import 'vuetify/styles'
import '@/main.scss'

// Vuetify
import { createVuetify } from 'vuetify'

export default createVuetify(
  // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
  {
    theme: {
      defaultTheme: 'myTheme',
      themes: {
        myTheme: {
          dark: false,
          colors: {
            background: '#FFFFFF',
            surface: '#474747',
            border: '#e9e9e9'
          }
        },
        // create a dark theme
        darkTheme: {
          dark: true,
          colors: {
            background: '#2b2b2b',
            surface: '#121212',
            border: '#525252'
          },
        },
      }
    }
  }
)