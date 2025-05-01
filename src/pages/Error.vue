<template>
  <v-empty-state
    action-text="Go Home"
    image="https://cdn.vuetifyjs.com/docs/images/components/v-empty-state/connection.svg"
    text="There might be a problem with your connection or our servers. Please check your internet connection or try again later. We appreciate your patience."
    title="Something Went Wrong"
    @click:action="onClickAction"
  ></v-empty-state>
</template>
<script>
export default{
    name: 'ErrorPage',
    data(){

    },
    methods:{
        onClickAction(){
            this.$router.push('/home')
        }
    }
}
</script>