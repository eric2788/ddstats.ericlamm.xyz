<template>
  <v-container class="pa-10">
      <v-row>
        <v-col cols=12 class="mb-10">
          <v-img :src="`/img/miriya.${Math.random() > 0.5 ? 'png' : 'jpg'}`" max-height=256 />
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <h3 class="mb-3">关于网站</h3>
          本网站使用了所有以 <small>https://blive.ericlamm.xyz</small> 作为 
          <span v-html="link('https://github.com/eric2788/vup_monitors', 'vup_monitors')" />(高亮用户机器人)
          的数据源的B站监控数据，并将其数据可视化。<br>
          ....是这样的，在推出公共API地址(也就是云服务器)作为 高亮用户机器人使用者 的一个额外选择后，我没想到我的服务器所监控的直播间居然达到了三百多个。<br>
          既然都已经监听了如此之多的直播间，那倒不如别浪费这些监控数据，于是便有了这个统计网站。
        </v-col>
      </v-row>
      <v-row class="pt-5">
        <v-col cols="12" sm=8>
          <h3 class="mb-3">联络作者</h3>
          如发现问题或有想法讨论， 可以到 github 库 发布 issues 或 Discussion，又或者联络我 <span v-html="link('https://t.me/eric1008818', 'Telegram')"/> 。
        </v-col>
       <v-col cols=12 sm=4>
         <h3 class="mb-3">贡献</h3>
          <b>源码贡献:</b> 可以到 github 库提交 PR <br>
          <b>直播间贡献:</b> 使用 <small>https://blive.ericlamm.xyz</small> 作为 vup_monitors 数据源就可以了
       </v-col>

      </v-row>
      <v-row class="pt-5">
         <v-col cols="12" sm=8>
          <h3 class="mb-3">声明</h3>
           由于每个用户监控直播间的列表时有变化，因此监控情况不会稳定，假设该直播间没有任何用户请求监控，那么该直播间就会自动中止监控，这无疑会影响到收集的数据。<br>
          <b>因此，本统计网站所统计的资料不能保证其完整性。</b> <br>
          此外，为了保障其他普通用户的私隐，<b>本网站已过滤所有非虚拟主播或非高能主播的用户记录</b>。(高能主播由检测有没有小闪电来判断，而虚拟主播列表则由 api.vtbs.moe 提供, 如果你发现网站上没有你所监控的虚拟主播，可尝试到 <span v-html="link('https://submit.vtbs.moe/', '这里')" /> 递交申请)
        </v-col>
         <v-col cols=12 sm=4>
         <h3 class="mb-3">源码</h3>
          <b>前端:</b> <span v-html="link('https://github.com/eric2788/ddstats.ericlamm.xyz', 'ddstats.ericlamm.xyz')" />  <br> <img src="https://img.shields.io/github/stars/eric2788/ddstats.ericlamm.xyz?style=social"/> <br>
          <b>后端:</b> <span v-html="link('https://github.com/eric2788/dd_vup_stats', 'dd_vup_stats')" /> <br> <img src="https://img.shields.io/github/stars/eric2788/dd_vup_stats?style=social"/>
       </v-col>
      </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'AboutView',


  methods: {
    link(url, title = undefined){
      return `<a href="${url}" target="_blank" style="color: inherit">${title ? title : url}</a>`;
    },
    getImageUrl(path){
      return require(`@/assets/${path}`);
    },
  }
}
</script>

<style>

</style>
