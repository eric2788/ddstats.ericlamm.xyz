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
            primary: '#6200EE',
            'primary-darken-1': '#3700B3',
            secondary: '#03DAC6',
            'secondary-darken-1': '#018786',
            error: '#B00020',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FB8C00',
          }
        },
        // create a dark theme
        darkTheme: {
          dark: true,
          colors: {
            background: '#121212',
            surface: '#303030',
          },
        },
      }
    }
  }
)