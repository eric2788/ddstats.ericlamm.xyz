<template>
    <v-container class="pa-5">
        <template v-if="!watcher || loading">
            <template v-if="!!error">
                <v-alert border type="error">
                    <v-alert-title>用戶资讯加载失败: </v-alert-title>
                    {{ error }}
                </v-alert>
                <v-btn class="mt-5" color="blue" variant="outlined" @click="$router.replace('/watchers')">
                    <v-icon left>mdi-arrow-left</v-icon>
                    返回搜索
                </v-btn>
            </template>
            <template v-else>
                <v-row align="center" justify="center" class="pt-15">
                    <v-progress-circular indeterminate></v-progress-circular>
                </v-row>
            </template>
        </template>
        <template v-else>
            <!-- details -->
            <v-divider />
            <v-row class="pa-5" justify="center"> </v-row>
            <vup-stats-board :boards="global_boards" :behaviours="global_behaviours" :fetcher="fetchUserStats" />
            <vup-stats-command-board :dd_boards="dd_boards" :fetcher="fetchCommandStats" />
        </template>
    </v-container>
</template>
<script>
import VupStatsBoard from "../components/VupStatsBoard.vue";
import VupStatsCommandBoard from "../components/VupStatsCommandBoard.vue";

import watcher from '../api/watcher'
import { toTitle } from '../api/utils'

export default {
    name: 'WatcherDetailView',

    components: {
        VupStatsBoard,
        VupStatsCommandBoard,
    },

    data: () => ({
        watcher: null,
        loading: true,
        error: '',

        // watcher will not have guest
        global_boards: [
            {
                title: "最常访问的主播",
                icon: "mdi-account-arrow-right",
                subtitle: undefined,
                panel: "1",
                command: 'top_dd_vups',
            },
            {
                title: "最高花费的主播",
                icon: "mdi-cash-multiple",
                subtitle: (props) => `共花费 ${props.spent} 元`,
                panel: "3",
                command: 'top_spent_vups',
            },
        ],

    }),

    methods: {
        fetchData() {
            this.loading = true;
            watcher
                .getWatcher(this.$route.params.uid)
                .then((res) => {
                    this.watcher = res;
                })
                .catch((err) => {
                    console.error(err);
                    this.error = err?.response?.data?.message ?? err.statusText
                    this.$emit("error", { msg: "加载用户资讯时错误: ", err });
                })
                .finally(() => (this.loading = false));
        },

        async fetchUserStats() {
            return await watcher.getWatcherStats(this.watcher.uid)
        },

        async fetchCommandStats(command, price) {
            const res = await watcher.getWatcherStatsByCommand(this.watcher.uid, command, price)
            return {
                top_dd_vups: res
            }
        }
    },

    computed: {
        global_behaviours() {
            return this.vup?.behaviours_count?.map(b => {
                return {
                    ...b,
                    title: toTitle(b.command),
                }
            })
        }
    },

}
</script>>