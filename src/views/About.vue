<template>
    <div class="about">
        <router-view/>

        <!--底部栏-->
        <section class="bottom">
            <router-link to="/about" class="select">选　餐</router-link>
            <router-link to="/about/center" class="center">中　心</router-link>
        </section>
    </div>
</template>
<style scoped lang="scss">
    .about {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;

    }

    .bottom {
        width: 100%;
        height: 81px;
        border-top: 1px solid #000;
        position: absolute;
        bottom: 0;
        display: block;
        font-size: 22px;
        line-height: 80px;
        text-align: center;
    }

    .select {
        width: 50%;
        box-sizing: border-box;
        border-right: 1px solid #000;
        height: 80px;
        line-height: 80px;
        float: left;
        list-style: none;
        text-decoration: none;
        color: #000;

    }

    .center {
        width: 50%;
        float: right;
        text-decoration: none;
        color: #000;
    }
</style>
