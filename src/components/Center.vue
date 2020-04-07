<template>
    <div class="centerBox">
        <table cellpadding="0" cellspacing="0">
            <colgroup>
                <slot></slot>
                <col width="25%">
                <col width="25%">
                <col width="25%">
                <col width="25%">
            </colgroup>
            <thead>
            <tr>
                <slot></slot>
                <th>星期</th>
                <th>菜品一</th>
                <th>菜品二</th>
                <th>价格(¥)</th>
            </tr>
            <tr v-for="(lists,i) in listDan">
                <td>{{lists.week}}</td>
                <td>{{parentJson(lists.menuArrayId).meatId}}</td>
                <td>{{parentJson(lists.menuArrayId).soupId}}</td>
                <td>{{lists.priceTotal}}</td>
            </tr>
            </thead>
        </table>
        <!--<slot-name :listDans="listDan">-->
            <!--<td></td>-->
        <!--</slot-name>-->
    </div>
</template>
<script>
    export default {
        name: 'center',
        data() {
            return {
                listDan: []
            }
        },
        mounted() {
            this.islistView(this.$store.state.userID)
        },
        methods: {
            islistView(userID) {
                this.axios.get(`http://hotel.haoweisys.com:9999/hwmenu-0.0.1-SNAPSHOT/menuInt/getOrderHistory?userId=${userID}`).then((data) => {
                    this.listDan = data.data.data.Historylist;
                    // console.log(this.listDan);
                }).catch((data) => {

                })
            },
            parentJson(meat){
                return JSON.parse(meat);
            }
        }
    }
</script>
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
</style>
