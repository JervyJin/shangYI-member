<template>
    <div id="point">
        <!-- 头部 -->
        <heade title="我的积分"></heade>
        <!-- banner -->
        <div class="banner">
            <div class="box">
                <div class="center">
                    <p class="title">可用积分</p>
                    <p class="jifen">{{Score}}</p>
                    <span class="btn" @click="goRecord">兑换记录
                        <i class="iconfont iconxiangshang-copy"></i>
                    </span>
                </div>
            </div>
            <!-- 积分记录列表 -->
            <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
                <van-list
                        v-model="loading"
                        :finished="finished"
                        :immediate-check="false"
                        finished-text="没有更多了"
                        @load="onLoad"
                        style="margin-top:0.19rem;"
                >
                    <div class="list">
                        <div class="item"  v-for="(item, index) in recordList" :key="index">
                            <div class="left">
                                <p>{{item.SourceType}}</p>
                                <span class="time">{{item.ChangeTime}}</span>
                            </div>
                            <div class="right" :class="{'income': Number(item.Value) > 0}">{{Number(item.Value) > 0 ? `+${item.Value}` : item.Value}} 分</div>
                            <van-divider v-show="recordList.length>1"/>
                        </div>
                    </div>
                </van-list>
            </van-pull-refresh>
        </div>
    </div>
</template>
<script>
    import heade from "../common/heade";

    export default {
        components: {
            heade
        },
        data() {
            return {
                Score: "",
                isLoading: false,
                loading: false,
                finished: false,
                page: 1,
                rows: 10,
                total: 0,
                recordList: [],
                time: "",
                value: ""
            };
        },
        methods: {
            back() {
                this.$router.go(-1);
            },
            goRecord() {
                this.$router.push({
                    name: "dhrecord"
                })
            },

            //**获取当前积分 */
            getJIfen() {

                this.http
                    .get("/api/services/app/MemberScoresService/GetScore", {
                        params: {}
                    })
                    .then(res => {
                        // console.log(res);
                        this.Score = res.Result.Data.Score;
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            /**
             * 获取积分记录列表
             */
            getList() {
                this.http.get("/api/services/app/MemberScoresService/GetScoreRecord", {
                    params: {
                        page: this.page,
                        rows: this.rows,
                    }
                }).then(res => {
                    console.log(res)
                    this.isLoading = false;
                    this.loading = false;
                    if (Math.ceil(this.total / this.rows) == this.page) {
                        this.finished = true;
                    }
                    if (res.Result.Code === 0) {

                        this.total = res.Result.Total;
                        // console.log(res.Result.Rows);
                        if (res.Result.Total <= this.rows) this.finished = true;
                        if (this.page == 1)
                            (this.recordList = res.Result.Rows);

                        else this.recordList.push(...res.Result.Rows);
                    } 
                    // else {
                    //     this.$toast({
                    //         message: "获取优惠券失败!!",
                    //         duration: 2000
                    //     });
                    // }
                    this.$toast.clear();
                })
            },
            onLoad() {
                this.page++;
                this.getList();
            },
            onRefresh() {
                this.page = 1;
                this.getList();
            },
        },
        created() {
            this.getJIfen();
            this.getList();

        }
    };
</script>
<style scoped lang="scss">
#point{
    background: #f6f3f7;
    min-height: 100%;
    padding-top: 0.12rem;
}
    .banner {
        width: 100%;
        padding: 0.12rem 0.4rem;
    }

    .box {
        height: 2.76rem;
        opacity: 1;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
        border-radius: 0.1rem;
        text-align: center;
    }

    .box .center {
        // line-height: 1rem;
        padding-top: 30px;

        .jifen {
            margin-top: 0.23rem;
            margin-bottom: 0.52rem;
        }
        .btn{
            color:#000;
            .iconfont{
                font-size: 0.16rem;
                color: #3C6EFD;
            }
        }
    }

    .box .jifen {
        color: #3c6efd;
        line-height: 0.52rem;
        font-size: 0.57rem;
    }

    .box span {
        display: inline-block;
        width: 1.67rem;
        line-height: 0.36rem;
        text-align: center;
        opacity: 0.35;
        border: 1px solid #8b8b8b;
        /* background: rgba(139, 139, 139, 0.35); */
        border-radius: 18px 18px 18px 18px;
        color: #8b8b8b;
        font-size: 0.24rem;
        padding: 0.02rem 0.08rem;
    }

    .list {
        opacity: 1;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 2px 6px 0px rgba(3, 0, 6, 0.1);
        // padding: 0.3rem 0.24rem 0;
        font-size: 0.24rem;
        /*font-weight: bold;*/
        &:first-child {
            border-radius: 0.1rem 0.1rem;
            box-shadow: 0 2px 6px 0 rgba(3, 0, 6, .1);
            overflow: hidden;
        }

        &:last-child {
            border-radius: 0 0 0.14rem 0.14rem;
            box-shadow: 0 2px 6px 0 rgba(3, 0, 6, .1);
            overflow: hidden;
        }
        
    }

    .list .item {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0.24rem ;

        // border-bottom: 1px solid #e6e6e6;
        // padding-bottom: 0.24rem;
        // &::after{
        //     display: block;
        //     content: "";
        //     width: 100%;
        //     height: 1px;
        //     background: #333;

        // }
    }

    .list .item .time {
        font-size: 0.2rem;
        color: #999;
    }

    .list .item .left {
        line-height: 0.32rem;
        p{
            margin-bottom: 0.08rem;
        }
    }

    .list .item .right {
        color: #4ace8c;
        font-size: 0.25rem;
        &.income{
            color: #FC997E;
        }
    }
    .van-divider {
    display: -webkit-box;
    display: -webkit-flex;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    align-items: center;
    margin: 16px 0;
    color: #969799;
    line-height: 24px;
    border-color: #ebedf0;
    border-style: solid;
    border-width: 0;
    position: absolute;
    left: 0;
    top: 0.86rem;
    width: 100%;
}
</style>