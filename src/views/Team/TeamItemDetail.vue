<template>
    <div class="TeamItemDetail">
        TeamItemDetail
        {{item_id}}
    </div>
</template>

<script>
    export default {
        name: "TeamItemDetail",
        data(){
            return{
                item_id:this.$route.params.id,
            }
        },
        mounted() {

        },
        methods:{

        }
    }
</script>

<style scoped>

</style>