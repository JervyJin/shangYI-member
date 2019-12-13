<template>
    <van-tabbar v-model="active" class="active_tab">
        <van-tabbar-item v-for="(item,index) in tabbars" :key="index" @click="tab(index,item.name)">
            <span :class="currIndex == index ? active:''">{{item.title}}</span>
            <template slot="icon" slot-scope="props">
                <!-- <img :src="props.active ? item.active : item.normal"/> -->
                <i :class="props.active ? item.active : item.normal"></i>
            </template>
        </van-tabbar-item>
    </van-tabbar>
</template>

<script>
    export default {
        data() {
            return {
                active: 0,
                currIndex: 0,
                tabbars: [
                    {
                        name: "index",
                        title: "首页",
                        // normal: require("../../assets/images/index.png"),
                        normal:"iconfont iconshouye",
                        active:"iconfont iconshouye index-color"
                        // active: require("../../assets/images/index1.png")
                    },
                    {
                        name: "tuijian",
                        title: "点我推荐",
                        normal: require("../../assets/images/zan.png"),
                        active: require("../../assets/images/zan1.png")
                    },
                    {
                        name: "persion",
                        title: "个人中心",
                        normal: require("../../assets/images/my.png"),
                        active: require("../../assets/images/my1.png")
                    },
                ]
                // icon: {
                //   normal: "../../assets/images/index.png",
                //   active: "//img.yzcdn.cn/icon-active.png"
                // }
            };
        },
        methods: {
            tab(index, val) {
                this.currIndex = index;
                this.$router.push(val);
            }
        }
    };
</script>

<style scoped lang="scss">
.iconshouye{
    color:#0579CB;
    font-size: 0.47rem;
}
    .van-tabbar--fixed {
        justify-content: space-around;
        align-items: center;
    }

    .van-tabbar {
        height: 1.09rem;

        &-item {
            font-size: .14rem;

            img {
                width: .4rem;
                height: .4rem;
            }

            &__text {
                span {
                    font-size: .16rem;
                }
            }
        }


    }

</style>

