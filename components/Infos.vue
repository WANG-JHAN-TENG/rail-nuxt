<template>
    <div class="container">
        <div class="error row justify-content-center" v-if="trainInfo == '' || ticketInfo == '' ">
            <h1>請重新選擇車站與時段</h1>
        </div>
        <div class="trainItem row justify-content-center" v-if="trainInfo != '' ">
            <div class="col-3 trainNo">列車編號</div>
            <div class="col-3 trainTime">出發及抵達時間</div>
            <div class="col-3 trainStation">起訖站</div>
            <div class="col-3 seatInfo">剩餘座位</div>
        </div>
        <div class="trains row justify-content-center " v-for="n in trainInfo" :key="n.index">
            <div class="col-3 trainNo" >
                {{n.DailyTrainInfo.TrainNo}}
            </div>
            <div class="col-3 trainTime">
                {{n.OriginStopTime.DepartureTime}}
                ~
                {{n.DestinationStopTime.ArrivalTime}}
                <br>
                <span>行駛時間{{n.movingTime}}</span>
            </div>
            <div class="col-3 trainStation">
                {{n.OriginStopTime.StationName.Zh_tw}}
                ~
                {{n.DestinationStopTime.StationName.Zh_tw}}
            </div>
            <div class="col-3 seatInfo">
                商務席:{{n.BusinessSeatStatus}}
                ；
                標準席:{{n.StandardSeatStatus}}
            </div>
        </div>
        <div class="trainItem row justify-content-center"  v-if="backTrainInfo != '' ">
            <div class="col-3 trainNo">列車編號</div>
            <div class="col-3 trainTime">出發及抵達時間</div>
            <div class="col-3 trainStation">起訖站</div>
            <div class="col-3 seatInfo">剩餘座位</div>
        </div>
        <div class="trains row justify-content-center " v-for="n in backTrainInfo" :key="n.index">
            <div class="col-3 trainNo" >
                {{n.DailyTrainInfo.TrainNo}}
            </div>
            <div class="col-3 trainTime">
                {{n.OriginStopTime.DepartureTime}}
                ~
                {{n.DestinationStopTime.ArrivalTime}}
                <br>
                <span>行駛時間{{n.movingTime}}</span>
            </div>
            <div class="col-3 trainStation">
                {{n.OriginStopTime.StationName.Zh_tw}}
                ~
                {{n.DestinationStopTime.StationName.Zh_tw}}
            </div>
            <div class="col-3 seatInfo">
                商務席:{{n.BusinessSeatStatus}}
                ；
                標準席:{{n.StandardSeatStatus}}
            </div>
        </div>
        <div class="ticket" v-if="ticketInfo != '' ">
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
                        <td>{{ticketInfo.Fares[0].Price}}</td>
                        <td>{{ticketInfo.Fares[5].Price}}</td>
                        <td>{{ticketInfo.Fares[3].Price}}</td>
                    </tr>
                    <tr>
                        <td>商務車廂</td>
                        <td>{{ticketInfo.Fares[1].Price}}</td>
                        <td>{{ticketInfo.Fares[6].Price}}</td>
                        <td>{{ticketInfo.Fares[4].Price}}</td>
                    </tr>
                    <tr>
                        <td>自由座車廂</td>
                        <td>{{ticketInfo.Fares[2].Price}}</td>
                        <td>{{ticketInfo.Fares[7].Price}}</td>
                        <td>-</td>
                    </tr>
                </table>
            </div>
        </div>
        <div class="back row justify-content-center">
                <NuxtLink to="/">
                    <div class="btn btn-outline-warning">
                        查詢其他時段
                    </div>
                </NuxtLink>
        </div>
    </div>
</template>

<script>
export default {
  data(){
    return{
        isShowStops:true,
    };
  },
  computed: {
      trainInfo(){
          return this.$store.state.trainInfo
      },
      backTrainInfo(){
          return this.$store.state.backTrainInfo
      },
      ticketInfo(){
          return this.$store.state.ticketInfo
      }
  },
  methods:{

  },
}
</script>

<style>
.trainItem{
    font-size: 1.5rem;
    font-weight: normal;
}
.col-3{
    text-align: center;
    margin: 5px 0;
}
.trains{
    border-bottom: 3px solid #EEEEEE;
}
.trains:hover{
    background-color: rgb(182, 226, 253);
}
.trainTime span{
    font-size: 0.6rem;
}
.showStops{
    display: none;
}
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
.back{
    margin: 10px;
}
</style>