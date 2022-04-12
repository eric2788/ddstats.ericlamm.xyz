<template>
    <v-container align=center justify=center :style="style" class="elevation-1">
        <v-progress-circular
            :color="color"
            style="padding-top: 50%" 
            align-self=center 
            justify-self=center 
            indeterminate 
         />
    </v-container>
</template>

<script>
export default {

    name: 'LoadingGrid',

    props: {
        color: {
            type: String,
            default: '#474747'
        }
    },

    computed: {
        style() {
            return {
                'align-items': 'center',
                'justify-content': 'center',
                height: '100%',
                width: '100%',
            }
        }
    }
}
</script>