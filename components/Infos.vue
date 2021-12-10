<template>
    <div class="container">
        <div class="error row justify-content-center" v-if="trainInfo == '' && ticketInfo == '' ">
            <h1>請選擇車站與時段</h1>
        </div>
        <div class="trainItem row justify-content-center" v-if="trainInfo != '' ">
            <div class="col-3 trainNo">列車編號 <span>(點選預定)</span></div>
            <div class="col-3 trainTime">出發及抵達時間</div>
            <div class="col-3 trainStation">起訖站</div>
            <div class="col-3 seatInfo">剩餘座位</div>
        </div>
        <div class="trains row justify-content-center " v-for="oneTrainInfo in trainInfo" :key="oneTrainInfo.index">
            <div class="col-3 trainNo" >
                <input type="radio" name="selected" @click="chooseTrain(oneTrainInfo)">
                {{oneTrainInfo.DailyTrainInfo.TrainNo}}
            </div>
            <div class="col-3 trainTime">
                {{oneTrainInfo.OriginStopTime.DepartureTime}}
                ~
                {{oneTrainInfo.DestinationStopTime.ArrivalTime}}
                <br>
                <span>行駛時間{{oneTrainInfo.movingTime}}</span>
            </div>
            <div class="col-3 trainStation">
                {{oneTrainInfo.OriginStopTime.StationName.Zh_tw}}
                ~
                {{oneTrainInfo.DestinationStopTime.StationName.Zh_tw}}
            </div>
            <div class="col-3 seatInfo">
                商務席:{{oneTrainInfo.BusinessSeatStatus}}
                ；
                標準席:{{oneTrainInfo.StandardSeatStatus}}
            </div>
        </div>
        <div class="trainItem row justify-content-center"  v-if="backTrainInfo != '' ">
            <div class="col-3 trainNo">列車編號 <span>(點選預定)</span></div>
            <div class="col-3 trainTime">出發及抵達時間</div>
            <div class="col-3 trainStation">起訖站</div>
            <div class="col-3 seatInfo">剩餘座位</div>
        </div>
        <div class="trains row justify-content-center " v-for="oneBackTrainInfo in backTrainInfo" :key="oneBackTrainInfo.index">
            <div class="col-3 trainNo" >
                <input type="radio" name="backSelected" @click="chooseBackTrain(oneBackTrainInfo)">
                {{oneBackTrainInfo.DailyTrainInfo.TrainNo}}
            </div>
            <div class="col-3 trainTime">
                {{oneBackTrainInfo.OriginStopTime.DepartureTime}}
                ~
                {{oneBackTrainInfo.DestinationStopTime.ArrivalTime}}
                <br>
                <span>行駛時間{{oneBackTrainInfo.movingTime}}</span>
            </div>
            <div class="col-3 trainStation">
                {{oneBackTrainInfo.OriginStopTime.StationName.Zh_tw}}
                ~
                {{oneBackTrainInfo.DestinationStopTime.StationName.Zh_tw}}
            </div>
            <div class="col-3 seatInfo">
                商務席:{{oneBackTrainInfo.BusinessSeatStatus}}
                ；
                標準席:{{oneBackTrainInfo.StandardSeatStatus}}
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
        <div class="booking row justify-content-center">
            <NuxtLink to="/booking">
                <div class="btn btn-outline-warning">
                    進入訂票頁面
                </div>
            </NuxtLink>
        </div>
        <div class="back row justify-content-center">
            <div class="col-3"></div>
            <div class="col-3">
                <NuxtLink to="/">
                    <div class="btn btn-outline-secondary">
                        返回查詢頁面
                    </div>
                </NuxtLink>
            </div>
            <div class="col-3">
                <NuxtLink to="/bookingInfo">
                    <div class="search btn btn-primary">
                        訂票查詢
                    </div>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data(){
    return{

    };
  },
//   updated(){
//        if(this.$store.state.selectedTrain.BusinessSeatStatus != 'X' || this.$store.state.selectedTrain.StandardSeatStatus != 'X' 
//        && this.$store.state.selectedBackTrain.BusinessSeatStatus != 'X' && this.$store.state.selectedBackTrain.StandardSeatStatus != 'X'){

//        }
//   },
  computed: {
      trainInfo(){
          return this.$store.state.trainInfo
      },
      backTrainInfo(){
          return this.$store.state.backTrainInfo
      },
      ticketInfo(){
          return this.$store.state.ticketInfo
      },
  },
  methods:{
      chooseTrain(oneTrainInfo){
          this.$store.commit("chooseTrain", oneTrainInfo);
      },
      chooseBackTrain(oneBackTrainInfo){
          this.$store.commit("chooseBackTrain", oneBackTrainInfo);
      },
  },
}
</script>

<style>
.trainNo span{
    font-size: 0.7rem;
}
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