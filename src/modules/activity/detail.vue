<template>
    <div class="container">
        <h1>{{detail.title}}</h1>
        <div class="subject-info">
            <div class="rating"><span>7.3</span>129387人评价</div>
            <p class="mate">134分钟 / 剧情 / 喜剧 / 黄渤(导演) / 黄渤 / 舒淇 / 王宝强 / 2018-08-10(中国大陆) 上映</p>
            <img src="" class="fr">
        </div>
        <div class="subject-belong">
            <h2>所属频道</h2>
            <ul>
                <li class="belong-tags" v-for="(item, index) in detail.genres" :key='index'>{{item}}</li>
            </ul>
        </div>
        <div class="subject-intor">
            <h2>{{detail.title}}的剧情介绍</h2>
            <div class="desctibe">
                {{detail.summary}}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "moveDetail",
    data() {
        return {
            detail: {},
        };
    },
    mounted() {
        this.$client.getData('/api/movie/subject/' + this.$route.params.id).then(res => {
            this.detail = res;
        })
    },
};
</script>

<style lang="less" scoped>
    .container{
        padding: 0 .24rem;
        h1{
            font-weight: normal;
            font-size: .34rem;
        }
    }
</style>
