<template>
    <div class="container bookingPanel">
        <div class="noInfo" v-if="SelectedTrain == '' ">
            <h1>請選擇車次</h1>
        </div>
        <div class="bookingForm" v-if="SelectedTrain != ''">
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
                        <select name="departure" id="departure" v-model="Departure">
                            <option v-for="stop in stops" :key="stop.index" :value="stop">{{stop.name}}</option>
                        </select>
                        <label for="arrival">到達站</label>
                        <select name="arrival" id="arrival" v-model="Arrival">
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
                            <input type="date" name="departDate" id="departDate" v-model="DepartDate">
                            <label for="trainNo">車次號碼</label>
                            <input name="trainNo" id="trainNo" v-model="SelectedTrain.DailyTrainInfo.TrainNo">
                            <select name="oneWayOrNot" v-model="OneWayOrNot">
                                <option value="false">單程</option>
                                <option value="true">去回程</option>
                            </select>
                            <br>
                            <div class="backtrip" v-if="OneWayOrNot == 'true'">
                                <label for="departDate">回程</label>
                                <input type="date" name="departDate" id="departDate" v-model="BackDepartDate">
                                <label for="backTrainNo">車次號碼</label>
                                <input name="backTrainNo" id="backTrainNo" v-model="SelectedBackTrain.DailyTrainInfo.TrainNo">
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
    SelectedTrain: {
        get () {
        return this.$store.state.selectedTrain
        },
        set (value) {
        this.$store.commit('setSelectedTrain', value)
        }
    },
    Departure: {
        get () {
        return this.$store.state.departure
        },
        set (value) {
        this.$store.commit('setDeparture', value)
        }
    },
    Arrival: {
        get () {
        return this.$store.state.arrival
        },
        set (value) {
        this.$store.commit('setArrival', value)
        }
    },
    OneWayOrNot:{
        get () {
        return this.$store.state.oneWayOrNot
        },
        set (value) {
        this.$store.commit('setOneWayOrNot', value)
        }   
    },
    DepartDate: {
        get () {
        return this.$store.state.departDate
        },
        set (value) {
        this.$store.commit('setDepartDate', value)
        }
    },
    BackDepartDate: {
        get () {
        return this.$store.state.backDepartDate
        },
        set (value) {
        this.$store.commit('setBackDepartDate', value)
        }
    },
    SelectedBackTrain: {
        get () {
        return this.$store.state.selectedBackTrain
        },
        set (value) {
        this.$store.commit('setSelectedBackTrain', value)
        }
    },
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
        if(this.$store.state.oneWayOrNot === "true"){
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
        if(this.$store.state.oneWayOrNot === "true"){
            this.goingBackPrice = total;
        }
    }
    this.totalPrice = this.goingToPrice + this.goingBackPrice;
  },
  methods:{
      goBook(){
        if(this.userId && this.Departure && this.Arrival && this.DepartDate && this.carType && this.SelectedTrain.DailyTrainInfo.TrainNo ){
            if(this.OneWayOrNot === "false"){
                if(this.ticketCount.adult > 0 || this.ticketCount.kid > 0 || this.ticketCount.love > 0 || this.ticketCount.older > 0 || this.ticketCount.student > 0){
                    return new Promise((resolve, reject) =>{
                        const db = getDatabase(GetfirebaseConfig());
                        set(ref(db, 'users/' + this.userId + "/goingTo"), {
                        startStation: this.$store.state.departure,
                        endStation: this.$store.state.arrival,
                        carType : this.carType,
                        date : this.$store.state.departDate,
                        trainNo : this.$store.state.selectedTrain.DailyTrainInfo.TrainNo,
                        departTime : this.$store.state.selectedTrain.OriginStopTime.DepartureTime,
                        arrivalTime : this.$store.state.selectedTrain.DestinationStopTime.ArrivalTime,
                        ticketCount : this.ticketCount,
                        price : this.goingToPrice,
                        }).then(()=>{
                            alert("訂票成功");
                            this.$store.commit("goBook");
                            resolve();
                        })
                        .catch(() =>{
                            alert("訂票失敗，請重新操作")
                            reject()
                        })
                    })
                }else{
                    alert("請選擇票數")
                }
            }else if(this.OneWayOrNot === "true"){
                if(this.BackDepartDate && this.SelectedBackTrain.DailyTrainInfo.TrainNo){
                    if(this.ticketCount.adult > 0 || this.ticketCount.kid > 0 || this.ticketCount.love > 0 || this.ticketCount.older > 0 || this.ticketCount.student > 0){
                        return new Promise((resolve, reject) =>{
                            const db = getDatabase(GetfirebaseConfig());
                            set(ref(db, 'users/' + this.userId + "/goingTo"), {
                            startStation: this.$store.state.departure,
                            endStation: this.$store.state.arrival,
                            carType : this.carType,
                            date : this.$store.state.departDate,
                            trainNo : this.$store.state.selectedTrain.DailyTrainInfo.TrainNo,
                            departTime : this.$store.state.selectedTrain.OriginStopTime.DepartureTime,
                            arrivalTime : this.$store.state.selectedTrain.DestinationStopTime.ArrivalTime,
                            ticketCount : this.ticketCount,
                            price : this.goingToPrice,
                            })
                            set(ref(db, 'users/' + this.userId + "/goingBack"), {
                            startStation: this.$store.state.arrival,
                            endStation: this.$store.state.departure,
                            carType : this.carType,
                            date : this.$store.state.backDepartDate,
                            trainNo : this.$store.state.selectedBackTrain.DailyTrainInfo.TrainNo,
                            departTime : this.$store.state.selectedBackTrain.OriginStopTime.DepartureTime,
                            arrivalTime : this.$store.state.selectedBackTrain.DestinationStopTime.ArrivalTime,
                            ticketCount : this.ticketCount,
                            price : this.goingBackPrice,
                            }).then(()=>{
                                alert("訂票成功");
                                this.$store.commit("goBook");
                                resolve();
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