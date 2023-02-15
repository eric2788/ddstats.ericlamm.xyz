<template>
  <v-switch @change="toggleTheme" :label="label" :color="theme.global.current.dark ? 'black' : 'white'"></v-switch>
</template>

<script>
import { useTheme } from 'vuetify'

export default {

  props: ['label'],

  setup () {
    const theme = useTheme()

    return {
      theme,
      toggleTheme: () => {
        theme.global.name.value = theme.global.current.value.dark ? 'myTheme' : 'darkTheme'
      }
    }
  }
}
</script>