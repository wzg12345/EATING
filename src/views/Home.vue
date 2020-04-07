<template>
    <div class="home">
        <h1>自助点餐系统</h1>
        <form action="" class="formClass">
            <label>
                <span>用户名:</span>
                <input type="text" v-model="userID">
            </label>
            <label>
                <span>密　码:</span>
                <input type="password">
            </label>
        </form>
        <button @click="login()">登 录</button>
    </div>
</template>
<style scoped rel="stylesheet/scss" lang="scss" >
    .home {
        width: 320px;
        height: 400px;
        margin: auto;
        position: absolute;
        top: 0;
        right: 0;
        left: 0;
        bottom: 0;
    }
    h1 {
        text-align: center;
        padding-bottom: 20px;
    }

    label {
        clear: both;
        display: block;
        font-size: 22px;
        & > span {
            width: 20%;
            padding-right: 5%;
            line-height: 66px;
        }
        & > input {
            display: inline-block;
            width: 70%;
            height: 44px;
            line-height: 44px;
            font-size: 22px;
            border-radius: 10px;
            background: none;
            outline: none;
            box-sizing: border-box;
            padding: 0 3%;
            border: 1px solid rgba(0, 0, 0, 0.58);
            font-weight: 100;
        }
    }
    button {
        background: none;
        width: 100px;
        text-align: center;
        height: 42px;
        font-size: 22px;
        line-height: 22px;
        margin: 50px auto;
        font-weight: 100;
        border-radius: 5px;
        border: 1px solid rgba(0, 0, 0, 0.58);
        display: block;
        outline: none;
    }
</style>
<script>
    // @ is an alias to /src
    // import HelloWorld from '@/components/Menu.vue'

    export default {
        name: 'home',
        data(){
            return{
                userID:'',
            }
        },
        components: {},
        methods:{
            login(){
                this.$router.push({path:'/about'});
                this.$store.state.userID = this.userID;
            }
        }
    }
</script>
