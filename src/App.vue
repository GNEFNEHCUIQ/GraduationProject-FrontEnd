<template>
  <div id="app">
    <router-view :key="key"/>
  </div>
</template>

<script>
  export default {
    name:'App',
    computed: {
      key(){
        return this.$route.fullPath
      }
    },
  }
</script>

<style>

</style>
