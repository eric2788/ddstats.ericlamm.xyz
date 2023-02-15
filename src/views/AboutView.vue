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
          <b>直播间贡献:</b> 
          <ul>
            <li>使用 <small>https://blive.ericlamm.xyz</small> 作为 <span v-html="link('https://github.com/eric2788/vup_monitors', 'vup_monitors')"/> 的数据源</li>
            <li>使用 <span v-html="link('https://github.com/eric2788/ddstats_client', 'ddstats_client')" /> 新增新的监控直播间</li>
          </ul>
       </v-col>

      </v-row>
      <v-row class="pt-5">
         <v-col cols="12" sm=8>
          <h3 class="mb-3">声明</h3>
           在基于包括但不限于 <b>网络连线不稳定，直播间监控列表时有变化，维护或更新期间的服务器重启或关闭</b> 等因素下，<b>本统计网站所统计的资料不能保证其完整性。</b> <br>
        </v-col>
         <v-col cols=12 sm=4>
         <h3 class="mb-3">源码</h3>
          <b>前端:</b> <span v-html="link('https://github.com/eric2788/ddstats.ericlamm.xyz', 'ddstats.ericlamm.xyz')" />  <br> <img src="https://img.shields.io/github/stars/eric2788/ddstats.ericlamm.xyz?style=social"/> <br>
          <b>后端:</b> <span v-html="link('https://github.com/eric2788/dd_vup_stats', 'dd_vup_stats')" /> <br> <img src="https://img.shields.io/github/stars/eric2788/dd_vup_stats?style=social"/> <br>
          <b>QQ机器人:</b> <span v-html="link('https://github.com/eric2788/vup_monitors', 'vup_monitors')" /> <br> <img src="https://img.shields.io/github/stars/eric2788/vup_monitors?style=social"/> <br>
          <b>直播间贡献:</b> <span v-html="link('https://github.com/eric2788/ddstats_client', 'ddstats_client')" /> <br> <img src="https://img.shields.io/github/stars/eric2788/ddstats_client?style=social"/>
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
  }
}
</script>

<style>

</style>
