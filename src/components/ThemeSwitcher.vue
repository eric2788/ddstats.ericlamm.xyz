<template>
  <v-switch @change="toggleTheme" label="toggle theme"></v-switch>
</template>

<script>
import { useTheme } from 'vuetify'

export default {
  setup () {
    const theme = useTheme()

    return {
      theme,
      toggleTheme: () => {
        theme.global.name.value = theme.global.current.value.dark ? 'myTheme' : 'dark'
      }
    }
  }
}
</script>