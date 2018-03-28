<template>
    <div>
      <!--登录成功-->
      <p>姓名:{{this.$route.params.Uname}}</p>
      <p>年龄:{{this.$route.params.Uage}}</p>
    </div>
</template>

<script>
    export default {
        name: "loginsuccess",
      // created(){
      //     let Username=this.$route.params.Uname
      // }
    }
</script>

<style scoped>

</style>
