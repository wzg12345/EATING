<template>
    <div class="centerBox">
        <table cellpadding="0" cellspacing="0">
            <colgroup>
                <col width="5%">
                <col width="15%">
                <col width="26%">
                <col width="26%">
                <col width="26%">
            </colgroup>
            <thead>
            <tr>
                <th @click="allSelect(true)" :class="{'check':checkAllFlag}">全选</th>
                <th>星期</th>
                <th>菜品一</th>
                <th>菜品二</th>
                <th>价格(¥)</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,i) in listEat">
                <td>
                    <div class="checkBox" :class="{'check':item.checked}" @click="addselect(item)"><i
                            class="checkDone"></i></div>
                    <!--<form><input name="checks" :class="{'check':item.checked}" @click="addselect(item)" type="checkbox"></form>-->
                </td>
                <td>{{item.week}}</td>
                <td>{{item.meat}}</td>
                <td>{{item.soup}}</td>
                <td>{{item.total}}</td>
            </tr>
            </tbody>
        </table>
        <div class="money"><span>结算：{{total}}</span><span class="pay" @click="pay()">立即支付</span></div>
    </div>
</template>

<script>
    export default {
        name: 'Menu',
        //参数
        data() {
            return {
                //数据列表
                listEat: [],
                //    选择开关
                total: 0,
                checkAllFlag: false
            }
        },
        created() {
            this.onReadyCogin();
        },
        //创建dom
        mounted() {
            this.listView(this.$store.state.userID);
        },
        computed: {},
        methods: {
            //全选
            allSelect(item) {
                this.checkAllFlag = !this.checkAllFlag;
                this.listEat.forEach((item, index) => {
                    if (typeof item.checked == 'undefined') {//检测属性是否存在
                        this.$set(item, "checked", this.checkAllFlag);//局部注册
                    } else {
                        item.checked = this.checkAllFlag;//状态取反
                    }
                });
                this.priceTotal();
            },
            //选择
            addselect(item) {
                let itemisChecked = [];
                if (typeof item.checked == 'undefined') {//检测属性是否存在
                    //Vue.set(item, "checked", true);
                    this.$set(item, "checked", true);//局部注册
                } else {
                    item.checked = !item.checked;//状态取反
                }
                this.listEat.forEach(function (item, index) {
                    if (item.checked === true) {
                        itemisChecked.push(item);
                    }
                });
                if (itemisChecked.length === this.listEat.length) {
                    this.checkAllFlag = true;

                } else {
                    this.checkAllFlag = false;
                }
                this.priceTotal();
            },
            //  总价
            priceTotal() {
                this.total = 0;//每次遍历商品之前对总金额进行清零
                this.listEat.forEach((item, index) => {//遍历商品，如果选中就进行加个计算，然后累加
                    if (item.checked) {
                        this.total += item.total;//累加的
                    }
                });
                return this.total;
            },
            //  付款
            pay() {
                //微信支付接口
                let openID = this.getQueryString('openId');
                this.onReadyPay(openID, 1);
            },
            //list数据循环
            listView(userID) {
                this.axios.get(`http://hotel.haoweisys.com:9999/hwmenu-0.0.1-SNAPSHOT/menuInt/selectByWeekMenu?userId=${userID}`).then((data) => {//不必在外部声明 this
                    console.log(data.data.data);
                    this.listEat = data.data.data;
                }).catch((data) => {

                });
            },
            //提交数据
            listPost(week, usedID) {
                this.axios.post(`http://hotel.haoweisys.com:9999/hwmenu-0.0.1-SNAPSHOT/menuInt/saveOrderHistory?userId=${usedID}&weekId=${week}`).then((data) => {//不必在外部声明 this
                    console.log(data.data);
                    //更新列表
                    this.$nextTick(function () {
                        this.listView(this.$store.state.userID);
                    });
                }).catch((data) => {

                });

            },
            //获取参数
            getQueryString(name){
                var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
                var r = window.location.search.substr(1).match(reg);  //匹配目标参数
                if (r != null) return unescape(r[2]); return null; //返回参数值
            },
            //微信获取签名信息等
            onReadyCogin() {
                let url = window.location.href;
                url = url.split("#")[0];
                this.axios.post(`http://third.haoweisys.com/hwmenu-0.0.1-SNAPSHOT/weixin/sgture.do?url=${url}`)
                    .then(function (response) {
                        if (response.status === 200) {
                            var data = response.data;//将解密后的字符串转为对象  Decrypt这里是解密，不需要的就直接过滤悼
                            //下列的data.均为后台接口返回的字段，比如我的项里里返回的是 appid,timestamp,nonceStr,signature
                            wx.config({
                                debug: false,//这里一般在测试阶段先用ture，等打包给后台的时候就改回false,
                                appId: data.appId,
                                timestamp: data.timestamp,
                                nonceStr: data.noncestr,
                                signature: data.signature,
                                jsApiList: ['chooseWXPay']
                            });
                            wx.ready(function () {
                                wx.checkJsApi({
                                    jsApiList: ['chooseWXPay'],
                                    success: function (res) {
                                        console.log("成功");
                                        console.log(res)
                                    },
                                    fail: function (res) {
                                        console.log("失败");
                                        console.log(res)
                                    }
                                })
                            })
                        } else {
                            // alert(response.data.flag);
                        }
                    }).catch(function (error) {
                })
            },
            //微信授权支付接口
            onReadyPay(openID, total) {
                this.axios.get(`http://115.28.72.235:9999/hwmenu-0.0.1-SNAPSHOT/wx/orderPay?openId=${openID}&totalFee=${total}`)
                    .then(function (response) {
                        if (response.status === 200) {
                            var data = response.data.data;//将解密后的字符串转为对象
                            console.log(data);
                            wx.ready(function () {
                                wx.chooseWXPay({
                                    appId: data.appId,
                                    timestamp: data.timeStamp, // 支付签名时间戳，注意微信jssdk中的所有使用timestamp字段均为小写。但最新版的支付后台生成签名使用的timeStamp字段名需大写其中的S字符
                                    nonceStr: data.nonceStr, // 支付签名随机串，不长于 32
                                    package: data.package, // 统一支付接口返回的prepay_id参数值，提交格式如：prepay_id=\*\*\*）
                                    signType: data.signType, // 签名方式，默认为'SHA1'，使用新版支付需传入'MD5'
                                    paySign: data.paySign, // 支付签名
                                    success: function (res) {
                                        let isChecked = [];
                                        //遍历所有选中
                                        this.listEat.forEach(function (item, index) {
                                            if (item.checked === true) {
                                                isChecked.push(item);
                                            }
                                        });
                                        //上传所有选中
                                        for (let n = 0; n < isChecked.length; n++) {
                                            this.listPost(isChecked[n].weekId, this.$store.state.userID);
                                            console.log(isChecked[n].weekId);
                                        }
                                        console.log('被选中个数===' + $('.check').length);
                                        console.log('总数===' + this.total);
                                        //跳转到支付成功页面有这个页面
                                        // $this.$router.push({
                                        //     path: "/success_page",
                                        //     name: "success_page"
                                        // });
                                        console.log(res);
                                    },
                                    cancel: function (res) {//提示引用的是mint-UI里toast
                                        alert('支付取消+++' + res)
                                    },
                                    fail: function (res) {
                                        alert('支付失败++++' + res)
                                    }
                                });
                            })
                        } else {
                            alert('支付终止+++' + res);
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
    table {
        width: 100%;
        border-top: 1px solid #000;
        height: calc(100% - 140px);
        box-sizing: border-box;

        & tbody {
            overflow-y: scroll;
            height: calc(100% - 42px);
            display: block;
        }

        & thead, tbody tr {
            display: table;
            width: 100%;
            table-layout: fixed;
        }

        & thead > td {
            line-height: 42px;
            height: 42px;
        }

        & th, & td {
            border-bottom: 1px solid #000;
            border-right: 1px solid #000;
            padding: 10px 5px;
            text-align: center;

            &:last-child {
                border-right: 0;
            }
        }

        tbody tr:last-child {
            td {
                border-bottom: 0;
            }
        }
    }

    .centerBox {
        height: calc(100% - 81px);
        overflow-y: scroll;
        width: 100%;
    }

    .money {
        border-top: 1px solid #000;
        font-size: 26px;
        padding: 15px 10px 0 0px;

        & > span {
            padding-left: 15px;
            display: block;
            float: left;
        }

        .pay {
            float: right;
            padding: 0 10px;
            height: 30px;
            border: 1px solid #000;
            text-align: center;
            line-height: 30px;
            font-size: 16px;
        }
    }

    .checkBox {
        width: 20px;
        height: 20px;
        border: 1px solid #000;
        position: relative;
        top: 50%;
        margin: 0 auto 0;
        box-sizing: border-box;

        & > .checkDone {
            position: relative;
            display: none;
            margin: -5px auto;
            width: 10px;
            height: 10px;
            top: 50%;
            background: navajowhite;
        }

        &.check > .checkDone {
            display: block;
        }
    }
</style>
