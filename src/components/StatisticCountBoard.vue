<template>
    <v-sheet :color="color" max-height="150" class="pa-5" >
        <v-row justify="start" :style="{color: textColor}">
            <v-col cols=12>
                <v-icon large>{{icon}}</v-icon>
                 {{ title }}
            </v-col>
        </v-row>
        <v-row justify="center" align="center">
            <v-col cols=12>
                <h1 :style="{color: textColor}">
                     <template v-if="value">
                         <h3>{{ value }}</h3>
                     </template>
                     <template v-else>
                         <v-progress-circular :color="textColor" indeterminate></v-progress-circular>
                     </template>
                </h1>
            </v-col>
        </v-row>
    </v-sheet>
</template>

<script>
export default {
    name: "StatisticCountBoard",
    props: {
        color: {
            type: String,
            default: '#474747'
        },
        textColor: {
            type: String,
            default: 'white'
        },
        title: String,
        value: {
            type: Number,
            default: undefined
        },
        icon: String
    },

    data: () => ({
    
    }),
}
</script>