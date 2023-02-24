<template>
   <router-view name="watcherView"  v-slot="{ Component }">
     <v-scroll-y-reverse-transition mode="out-in">
        <component :is="Component" />
     </v-scroll-y-reverse-transition>
   </router-view>
</template>
<script>
export default {
    name: 'WatcherView',

}
</script>