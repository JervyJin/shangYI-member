<template>
  <div class="content">
    <p class="title">会员注册协议</p>
    <p class="detailTitle">第一条 会员资格</p>
    <p class="intends">在您承诺完全同意本服务条款并在完成注册程序后，即可成为本会员，享受我们为您提供的服务。</p>
    <p class="detailTitle">第二条 会员权限</p>
    <p class="intends">会员有责任保管好自己的注册密码并定期修改避免造成损失，由于会员疏忽所造成的损失由会员承担。用户应当対以其用户帐号进行的所有活动和事件负法律责任。</p>
    <p class="detailTitle">第三条 会员资格的取消</p>
    <p class="intends">如发现任何会员有以下故意行为之一，本保留取消其使用服务的权利，并无需做出任何补偿；</p>
    <p class="intends">1.可能造成本系统全部或局部的服务受影响，或危害本系统运行；</p>
    <p class="intends">2.	以任何欺诈行为获得会员资格；</p>
    <p class="intends">3.	在本系统内从事非法商业行为，发布涉及敏感政治、宗教或其它违反有关国家法律和政府法规的文字、图片等信息；</p>
    <p class="detailTitle">第五条 服务商的权利</p>
    <p class="intends">1.	有权审核、接受或拒绝会员的入会申请，有权撤销或停止会员的 全部或部分服务内容；</p>
    <p class="intends">2.	有权修订会员的权利和义务，有权修改或调整本的服务内容；</p>
  </div>
</template>
<script>
export default {
  data() {
    return {

    };
  },
  methods: {

  }
};
</script>
<style scoped>
    .content{
        padding: 0.5rem 0.4rem;
    }
    .content p{
        font-size: 0.2rem;
        line-height: 0.4rem!important;
    }
    .content .detailTitle{
        font-size: 0.25rem;
        font-weight: 500
    }
    .content .title{
        text-align: center;
        font-weight: 500;
        font-size: 0.4rem;
        margin-bottom: 0.5rem;
    }
    .intends{
        text-indent: 0.6rem;
    }
</style>