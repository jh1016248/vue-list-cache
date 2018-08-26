<template>
    <div id="app">
        <keep-alive>
            <router-view v-if="$route.meta.keep"/>
        </keep-alive>
        <router-view v-if="!$route.meta.keep"/>
    </div>
</template>

<script>
export default {
    name: 'App'
}
</script>

<style>

</style>
