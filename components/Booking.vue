<template>
    <div class="container bookingPanel">
        <div class="noInfo" v-if="selectedTrain == '' ">
            <h1>請選擇車次</h1>
        </div>
        <div class="bookingForm" v-if="selectedTrain != ''">
            <table class="table">
            <tbody>
                <tr>
                    <th scope="row">訂票人ID</th>
                    <td>
                        <input name="userId" id="userId" v-model="userId">
                    </td>
                </tr>
                <tr>
                    <th scope="row">起訖站</th>
                    <td>
                        <label for="departure">起程站</label>
                        <select name="departure" id="departure" v-model="searchInfo.departure" disabled>
                            <option v-for="stop in stops" :key="stop.index" :value="stop">{{stop.name}}</option>
                        </select>
                        <label for="arrival">到達站</label>
                        <select name="arrival" id="arrival" v-model="searchInfo.arrival" disabled>
                            <option v-for="stop in stops" :key="stop.index" :value="stop">{{stop.name}}</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th scope="row">車廂種類</th>
                    <td>
                        <input type="radio" name="color" value="0" v-model="carType"> 標準車廂
                        <input type="radio" name="color" value="1" v-model="carType"> 商務車廂
                    </td>
                    </tr>
                    <tr>
                    <th scope="row">時間</th>
                    <td colspan="2">
                            <label for="departDate">去程</label>
                            <input type="date" name="departDate" id="departDate" v-model="searchInfo.departDate" disabled>
                            <label for="trainNo">車次號碼</label>
                            <input name="trainNo" id="trainNo" v-model="selectedTrain.DailyTrainInfo.TrainNo" disabled>
                            <select name="oneWayOrNot" v-model="searchInfo.oneWayOrNot" disabled>
                                <option value="false">單程</option>
                                <option value="true">去回程</option>
                            </select>
                            <br>
                            <div class="backtrip" v-if="searchInfo.oneWayOrNot === 'true'">
                                <label for="departDate">回程</label>
                                <input type="date" name="departDate" id="departDate" v-model="searchInfo.backDepartDate" disabled>
                                <label for="backTrainNo">車次號碼</label>
                                <input name="backTrainNo" id="backTrainNo" v-model="selectedBackTrain.DailyTrainInfo.TrainNo" disabled>
                            </div>
                    </td>
                </tr>
                <tr>
                    <th scope="row">票數</th>
                    <td colspan="2">
                        <label for="adult">全票</label>
                        <select name="adult" id="adult" v-model="ticketCount.adult">
                            <option v-for="ticketCountNum in ticketCountNums" :key="ticketCountNum.index" :value="ticketCountNum.value">{{ticketCountNum.num}}</option>
                        </select>
                        <label for="kid">孩童票(6-11歲)</label>
                        <select name="kid" id="kid" v-model="ticketCount.kid">
                            <option v-for="ticketCountNum in ticketCountNums" :key="ticketCountNum.index" :value="ticketCountNum.value">{{ticketCountNum.num}}</option>
                        </select>
                        <label for="love">愛心票</label>
                        <select name="love" id="love" v-model="ticketCount.love">
                            <option v-for="ticketCountNum in ticketCountNums" :key="ticketCountNum.index" :value="ticketCountNum.value">{{ticketCountNum.num}}</option>
                        </select>
                        <label for="adult">敬老票(65歲以上)</label>
                        <select name="older" id="older" v-model="ticketCount.older">
                            <option v-for="ticketCountNum in ticketCountNums" :key="ticketCountNum.index" :value="ticketCountNum.value">{{ticketCountNum.num}}</option>
                        </select>
                        <label for="student">大學生優惠票</label>
                        <select name="student" id="student" v-model="ticketCount.student">
                            <option v-for="ticketCountNum in ticketCountNums" :key="ticketCountNum.index" :value="ticketCountNum.value">{{ticketCountNum.num}}</option>
                        </select>
                    </td>
                </tr>
                <tr>
                    <th>總價</th>
                    <td>${{totalPrice}}</td>
                </tr>
            </tbody>
            </table>
            <div class="bookingButton row justify-content-center">
                <div class="btn btn-outline-success" @click="goBook">
                    訂票
                </div>
            </div>
        </div>

        <div class="button row justify-content-center">
            <div class="col-3 search">
                <NuxtLink to="/">
                    <div class="btn btn-outline-secondary">
                        查詢其他時段
                    </div>
                </NuxtLink>
            </div>
            <div class="col-3 info">
                <NuxtLink to="/trainInfo">
                    <div class="btn btn-outline-secondary">
                        選擇其他列車
                    </div>
                </NuxtLink>
            </div>
            <div class="col-3 info">
                <NuxtLink to="/bookingInfo">
                    <div class="btn btn btn-primary">
                        訂票查詢
                    </div>
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script>
import { GetfirebaseConfig } from '~/assets/FirebaseConfig.js';
import { getDatabase, ref, set } from "firebase/database";

export default {
  data(){
    return{
        stops:[
            {name: "請選擇", value: ""},
            {name: "南港", value: "0990"},
            {name: "台北", value: "1000"},
            {name: "板橋", value: "1010"},
            {name: "桃園", value: "1020"},
            {name: "新竹", value: "1030"},
            {name: "苗栗", value: "1035"},
            {name: "台中", value: "1040"},
            {name: "彰化", value: "1043"},
            {name: "雲林", value: "1047"},
            {name: "嘉義", value: "1050"},
            {name: "台南", value: "1060"},
            {name: "左營", value: "1070"}
        ],
        ticketCountNums:[
            {num: "0", value: "0"},
            {num: "1", value: "1"},
            {num: "2", value: "2"},
            {num: "3", value: "3"},
            {num: "4", value: "4"},
            {num: "5", value: "5"},
            {num: "6", value: "6"},
            {num: "7", value: "7"},
            {num: "8", value: "8"},
            {num: "9", value: "9"},
            {num: "10", value: "10"}
        ],
        searchInfo: {
            departure: {name: "請選擇",value: ""},
            arrival: {name: "請選擇",value: ""},
            oneWayOrNot:"false",
            departDate:"",
            backDepartDate:""
        },
        selectedTrain:[],
        selectedBackTrain:[],
        userId: "",
        carType:"",
        ticketCount : {
            adult : 0,
            kid : 0,
            love : 0,
            older : 0,
            student : 0,
        },
        goingToPrice: "",
        goingBackPrice: "",
        totalPrice: "",
    };
  },
  computed: {

  },
  created(){
      this.searchInfo.departure.name = this.$store.state.departureName;
      this.searchInfo.departure.value = this.$store.state.departureValue;
      this.searchInfo.arrival.name = this.$store.state.arrivalName;
      this.searchInfo.arrival.value = this.$store.state.arrivalValue;
      this.searchInfo.oneWayOrNot = this.$store.state.oneWayOrNot;
      this.searchInfo.departDate = this.$store.state.departDate;
      this.searchInfo.backDepartDate = this.$store.state.backDepartDate;
      this.selectedTrain = this.$store.state.selectedTrain;
      this.selectedBackTrain = this.$store.state.selectedBackTrain;
  },
  updated(){
    let ticketInfo = this.$store.state.ticketInfo;
    if(this.carType === "0"){
        let total = 
        ticketInfo[4] * this.ticketCount.adult +
        ticketInfo[1] * this.ticketCount.kid +
        ticketInfo[1] * this.ticketCount.love +
        ticketInfo[1] * this.ticketCount.older +
        ticketInfo[2] * this.ticketCount.student;
        this.goingToPrice = total;
        if(this.searchInfo.oneWayOrNot === "true"){
            this.goingBackPrice = total;
        }
    }else if(this.carType === "1"){
        let total =
        ticketInfo[7] * this.ticketCount.adult +
        ticketInfo[5] * this.ticketCount.kid +
        ticketInfo[5] * this.ticketCount.love +
        ticketInfo[5] * this.ticketCount.older +
        ticketInfo[6] * this.ticketCount.student;
        this.goingToPrice = total;
        if(this.searchInfo.oneWayOrNot === "true"){
            this.goingBackPrice = total;
        }
    }
    this.totalPrice = this.goingToPrice + this.goingBackPrice;
  },
  methods:{
      goBook(){
        if(this.userId && this.searchInfo.departure && this.searchInfo.arrival && this.searchInfo.departDate && this.carType && this.selectedTrain.DailyTrainInfo.TrainNo ){
            if(this.searchInfo.oneWayOrNot === "false"){
                if(this.ticketCount.adult > 0 || this.ticketCount.kid > 0 || this.ticketCount.love > 0 || this.ticketCount.older > 0 || this.ticketCount.student > 0){
                    return new Promise((resolve, reject) =>{
                        const db = getDatabase(GetfirebaseConfig());
                        set(ref(db, 'users/' + this.userId + "/goingTo"), {
                        startStation: this.searchInfo.departure,
                        endStation: this.searchInfo.arrival,
                        carType : this.carType,
                        date : this.searchInfo.departDate,
                        trainNo : this.selectedTrain.DailyTrainInfo.TrainNo,
                        departTime : this.selectedTrain.OriginStopTime.DepartureTime,
                        arrivalTime : this.selectedTrain.DestinationStopTime.ArrivalTime,
                        ticketCount : this.ticketCount,
                        price : this.goingToPrice,
                        }).then(()=>{
                            alert("訂票成功");
                            resolve();
                            window.location.reload();
                        })
                        .catch(() =>{
                            alert("訂票失敗，請重新操作")
                            reject()
                        })
                    })
                }else{
                    alert("請選擇票數")
                }
            }else if(this.searchInfo.oneWayOrNot === "true"){
                if(this.searchInfo.backDepartDate && this.selectedBackTrain.DailyTrainInfo.TrainNo){
                    if(this.ticketCount.adult > 0 || this.ticketCount.kid > 0 || this.ticketCount.love > 0 || this.ticketCount.older > 0 || this.ticketCount.student > 0){
                        return new Promise((resolve, reject) =>{
                            const db = getDatabase(GetfirebaseConfig());
                            set(ref(db, 'users/' + this.userId + "/goingTo"), {
                            startStation: this.searchInfo.departure,
                            endStation: this.searchInfo.arrival,
                            carType : this.carType,
                            date : this.searchInfo.departDate,
                            trainNo : this.selectedTrain.DailyTrainInfo.TrainNo,
                            departTime : this.selectedTrain.OriginStopTime.DepartureTime,
                            arrivalTime : this.selectedTrain.DestinationStopTime.ArrivalTime,
                            ticketCount : this.ticketCount,
                            price : this.goingToPrice,
                            })
                            set(ref(db, 'users/' + this.userId + "/goingBack"), {
                            startStation: this.searchInfo.arrival,
                            endStation: this.searchInfo.departure,
                            carType : this.carType,
                            date : this.searchInfo.backDepartDate,
                            trainNo : this.selectedBackTrain.DailyTrainInfo.TrainNo,
                            departTime : this.selectedBackTrain.OriginStopTime.DepartureTime,
                            arrivalTime : this.selectedBackTrain.DestinationStopTime.ArrivalTime,
                            ticketCount : this.ticketCount,
                            price : this.goingBackPrice,
                            }).then(()=>{
                                alert("訂票成功");
                                resolve();
                                window.location.reload();
                            })
                            .catch(() =>{
                                alert("訂票失敗，請重新操作")
                                reject()
                            })
                        })
                    }else{
                        alert("請選擇票數")
                    }
                }else{
                    alert("請輸入回程列車資訊")
                }
            }
        }else{
            alert("請輸入完整列車資訊")
        }
      }
  },
}
</script>

<style>
.noInfo{
    text-align: center;
}
.bookingPanel{
    width: 65%;
    margin: 50px auto;
}
</style>