<template>
    <div>
        <!-- 头部 -->
        <heade title="推荐赚钱"></heade>
        <!-- banner -->
        <div class="banner">
            <div class="top">
                <p>累计收益</p>
                <p class="jin">{{data.Cumulative}}</p>
            </div>
            <div class="mid">
                <div>
                    <p class="num">{{data.RecommendRegister}}</p>
                    <p>推荐注册</p>
                </div>
                <div>
                    <p class="num">{{data.Consumed}}</p>
                    <p>已消费</p>
                </div>
                <div>
                    <p class="num">{{data.Unconsumed}}</p>
                    <p>未消费</p>
                </div>
            </div>
            <div class="bot">
                <div class="item" @click="Toyaoqing">
                    <div class="left">
                        <i class="iconfont icondianzan"></i>
                        <span>点我推荐</span>
                    </div>
                    <div class="right"></div>
                </div>
                <!-- <van-divider/> -->
                <div class="item" @click="Tojiangli">
                    <div class="left">
                        <i class="iconfont iconliwu"></i>
                        <span>我的奖励</span>
                    </div>
                    <!-- <img class="right" src="../../assets/images/arrow.png" alt /> -->
                    <div class="right"></div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import heade from "../common/heade";
    import axios from "axios";

    export default {
        components: {
            heade
        },
        data() {
            return {
                data: {}
            };
        },
        methods: {
            back() {
                this.$router.go(-1);
            },
            Toyaoqing() {
                this.$router.push({path: "/yaoqingLi"});
            },
            Tojiangli() {
                this.$router.push({path: "/jiangli"});
            }
        },
        created() {
            let _this = this;

            // 获取账户余额
            this.http
                .get("/api/services/app/CRMMemberService/GetRecommendMoney", {
                    params: {}
                })
                .then(function (response) {
                    console.log(response);

                    _this.data = response.Result.Data;
                })
        },
    };
</script>
<style scoped lang="scss">

    .banner {
        width: 100%;
        padding: 0.12rem 0.4rem;
    }

    .top {
        font-size: 0.2rem;
        opacity: 1;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
        border-radius: 0.1rem;
        text-align: center;
        padding: 0.6rem 0;
        margin: 0.12rem auto;
    }

    .top .jin {
        color: #3c6efd;
        font-size: 0.57rem;
        margin-top: 0.24rem;
    }

    .mid {
        /* width: 670px; */
        margin: 0 auto;
        height: 1.12rem;
        opacity: 1;
        background: rgba(255, 255, 255, 1);
        display: flex;
        justify-content: space-around;
        align-items: center;
        color: #333333;
        font-size: 0.24rem;
        text-align: center;
        box-shadow: 0 2px 6px 0 rgba(3, 0, 6, .1);
        border-radius: .1rem;
    }

    .mid .num {
        color: #3c6efd;
        font-size: 0.3rem;
        margin-bottom: 0.12rem;
    }

    .bot {
        margin: 0.14rem auto;
        /*font-weight: bold;*/
        // height: 1.76rem;
        opacity: 1;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
        border-radius: 0.1rem;
        padding: 0 0.23rem;
    }

    .bot .item {
        clear: both;
        color: #333;
        font-size: .24rem;
        line-height: .65rem;
        height: .92rem;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #e6e6e6;

    }

    .bot .item .left {
        display: flex;
        align-items: center;
        .iconfont{
            font-size: 0.34rem;
            margin-right: 0.16rem;
            margin-top: 0.04rem;
            &.icondianzan{
                color: #898DE7;
            }
            &.iconliwu{
                color: #fc997e;
            }
        }
        span {
            padding-top: 4px;
        }
    }

    .bot .item .left img {
        width: 0.34rem;
        height: 0.34rem;
        margin-right: 5px;
    }

    .bot .item .right {
        float: right;
        width: 0.13rem;
        height: 0.14rem;
        /* color: #999999; */
        border: 1px solid #999;
        border-bottom: 0;
        border-left: 0;
        transform: rotate(45deg);
        margin-top: 10px;
    }

    /deep/ {
        .van-divider.van-divider--hairline {
            margin: 0;
        }
    }

</style>