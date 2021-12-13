<template>
    <div class="container">
        <div class="ticket">
            <div class="ticketTitle">
                <h3>車廂票價參考</h3>
            </div>
            <div class="ticketTable">
                <table class="table table-borderless">
                    <tr>
                        <th scope="col-3"></th>
                        <th scope="col-3">全票</th>
                        <th scope="col-3">孩童票/敬老票/愛心票</th>
                        <th scope="col-3">團體票</th>
                    </tr>
                    <tr>
                        <td>標準車廂</td>
                        <td>{{ticketInfo[4]}}</td>
                        <td>{{ticketInfo[1]}}</td>
                        <td>{{ticketInfo[2]}}</td>
                    </tr>
                    <tr>
                        <td>商務車廂</td>
                        <td>{{ticketInfo[7]}}</td>
                        <td>{{ticketInfo[5]}}</td>
                        <td>{{ticketInfo[6]}}</td>
                    </tr>
                    <tr>
                        <td>自由座車廂</td>
                        <td>{{ticketInfo[3]}}</td>
                        <td>{{ticketInfo[0]}}</td>
                        <td>-</td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props:["parentInfo"],
    data(){
        return{
            ticketInfo: this.parentInfo,
        };
    },
    updated(){

    },
    computed: {

    },
    methods:{

    },
}
</script>

<style>
    .ticket{
        margin: 30px auto;
        text-align: center;
    }
    .ticketTitle{
        position: relative;
        margin: 20px auto;
        padding: 5px;
        font-size: 2rem;
        font-weight: normal;
        letter-spacing: 2px;
    }
    .ticketTitle ::after{
        content: "";
        display: block;
        position: absolute;
        width: 90px;
        height: 3px;
        left: 50%;
        bottom: 0;
        background-color: #ca4f0f;
        margin-left: -45px;
    }
</style>