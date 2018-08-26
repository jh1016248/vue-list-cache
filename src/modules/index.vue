<template>
    <div class="container">
        <ul class="nav">
            <li v-for="(item, index) in navList" :class="{'active': index == navIndex}" :key="index" @click="changeNav(index)">{{item.name}}</li>
        </ul>
        <div class="move-list">
            <ul>
                <li v-for="(item, index) in list" :key="index" @click="toDetail(item.id)">
                    <div class="cover" :style="{backgroundImage: 'url('+ item.images.medium +')'}"></div>
                    <h3>{{item.title}}</h3>
                </li>
            </ul>
            <p class="center" style="padding: .2rem 0;" v-if="noMore">没有更多</p>
        </div>
    </div>
</template>

<script>
let navList = [
    {
        name: '即将上映',
        url: '/api/movie/coming_soon'
    },
    {
        name: 'Top250',
        url: '/api/movie/top250'
    }
]
export default {
    name: "index",
    data() {
        return {
            navList: navList,
            navIndex: 0,
            start: 0,
            count: 20,
            list: [],
            isLoading: false,
            noMore: false,
        };
    },
    methods: {
        changeNav(i) {
            this.navIndex = i;
            this.getData(true)
        },
        getData(isChangeNav = false) {
            this.isLoading = true;
            this.$client.getData(this.navList[this.navIndex].url, {start: this.start, count: this.count}).then(res => {
                this.isLoading = false;
                if(isChangeNav) {
                    this.list = [];
                    window.scrollTo(0,0);
                }
                this.$nextTick(() => {
                    if(this.list.length) {
                        if(res.subjects.length < 20) {
                            this.noMore = true
                        }
                        this.list = this.list.concat(res.subjects)
                    }
                    else{
                        this.list = res.subjects;
                    }
                })
            })
        },
        toDetail(id) {
            this.$router.push('/activity/' + id)
        },
        initScrollEvent() {
            let winHeight = window.innerHeight;
            document.body.onscroll = () => {
                if(this.isLoading || this.noMore) return false;

                let scrollTop = document.body.scrollTop || document.documentElement.scrollTop;        
                let scrollHeight = document.documentElement.scrollHeight;
                if(scrollTop > scrollHeight - winHeight - 50) {
                    this.start ++;
                    this.getData();
                }
            }
        }
    },
    mounted() {
        this.initScrollEvent()
        this.getData();
    },
    watch: {
        $route(now, prev) {
            if(now.path == '/') {
                this.initScrollEvent()
            }
            else{
                document.body.onscroll = null;
            }
        }
    },
};
</script>

<style lang="less" scoped>
.container{
    padding-top: 1.1rem;
    .nav{
        position: fixed;
        background: #fff;
        box-shadow: 0 .02rem .2rem rgba(0,0,0,.3);
        top: 0;
        left: 0;
        width: 100%;
        height: .8rem;
        display: flex;
        li{
            width: 50%;
            height: 100%;
            line-height: .8rem;
            text-align: center;
            font-size: .3rem;
            &.active{
                color: red;
            }
        }
    }
}
h2{
    font-size: .3rem;
    margin: .2rem 0;
    padding: 0 .3rem;
    color: #494949
}
.move-list{
    ul{
        display: flex;
        flex-wrap: wrap;
        padding: 0 .3rem;
        justify-content: space-between;
        li{
            width: 30%;
            margin-bottom: .3rem;
            .cover{
                height: 3rem;
                width: 100%;
                background-size: cover;
                background-position: center;
                display: block;
            }
            h3{
                text-align: center;
                overflow: hidden;
                font-weight: normal;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-size: .24rem;
            }
        }
    }
}
</style>
