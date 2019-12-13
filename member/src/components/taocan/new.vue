<template>
    <div id="bind_new">
        <heade title="绑定新套餐"></heade>
        <div class="input-body">
            <van-field v-model="Phone" type="number" clearable label="明卡号" placeholder="请输入明卡号"/>
            <van-field v-model="passworld" clearable label="卡密" placeholder="请输入卡密"/>
        </div>
        <div class="banner">
            <van-button
                    type="info"
                    @click="submit"
                    size="large"
                    style="margin-top:0.4rem;border-radius: 0.1rem;"
            >立即绑定
            </van-button>
        </div>
    </div>
</template>
<script>
    import heade from "../common/heade";

    export default {
        components: {
            heade,
        },
        data() {
            return {
                Phone: '',
                passworld: ''
            }
        },
        methods: {
            back() {
                this.$router.go(-1);
            },
            /**
             * 绑定新套餐
             */
            submit() {
                this.$dialog.confirm({
                    title: '温馨提示',
                    message: '您确定要绑定吗?'
                }).then(() => {
                    // this.$toast.loading({
                    //     duration: 0,
                    //     forbidClick: true,
                    //     loadingType: 'spinner',
                    //     message: '加载中...'
                    // });
                    this.http.put('/api/services/app/CRMMemberComboService/UpdateMemberNewCombo', {
                        CardNo: this.Phone,
                        CardPassword: this.passworld
                    }).then(res => {
                        if (res.Result.Code === 0) {
                            this.$toast({
                                message: '绑定成功!!',
                                duration: 2000
                            });
                            setTimeout(() => {
                                this.$router.push({
                                    name: 'quanbao'
                                })
                            }, 2000)
                        }
                    }).catch((err) => {

                    })
                }).catch(() => {
                    // this.$toast({
                    //     message: '绑定失败!!',
                    //     duration: 2000
                    // });
                    // this.$toast.clear();
                });
            },

        },
    }
</script>
<style lang="scss" scoped>
#bind_new{
  background: #f6f3f7;
  min-height: 100%;
  padding-top: 0.12rem;
}
    .input-body {
        width: 90%;
        margin: 0 auto .4rem;
        background: white;
        border-radius: .1rem;
        display: block;
        box-shadow: 0px 2px 6px 0px rgba(3,0,6,0.1);
        padding: 0 .24rem;
    }

    .banner {
        width: 90%;
        margin: 0 auto;
    }

    /deep/.van-cell {
      font-size: .26rem;
      align-items: center;
      height: 0.74rem;
      padding: 0;
      .van-cell__title{
          font-size: 0.24rem;
          color: #333;
      }
      .van-cell__value{
          height: 100%;
      }
      .van-field__body{
          height: 100%;
          border-bottom: 1px solid #e6e6e6;
          padding-left: 0.46rem;
      }
      .van-field__label{
          min-width: .9rem;
      }
    }
    .van-cell:not(:last-child)::after{
        display: none;
    }
    .van-cell:not(:last-child){
        .van-field__body{
          border-bottom: none;
      }
    }
  .van-button--large{
      height: 0.74rem;
    line-height: .74rem;
    border-radius: 0.1rem;
    background: #5BA1E7;
    margin-top: 0 !important;
    border: none;
}
</style>