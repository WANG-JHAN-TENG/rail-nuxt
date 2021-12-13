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
                        <input type="radio" name="color" value="0" v-model="carType" :disabled="isStandardDisabled"> 標準車廂
                        <input type="radio" name="color" value="1" v-model="carType" :disabled="isBusinessDisabled"> 商務車廂
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
        </div>
        <div class="seatTable" v-if="totalSeat > 0">
            <div class="seatTitle">
                <h2>請選擇座位</h2>
            </div>
            <div class="seatChoice">
                <h3>列車車頭</h3>
                <div class="oneTrain">
                    <div class="seat" v-for="(seat, index) in seats" :key="seat.index">
                        <div class="selectCar" v-if="selectedCar == index">
                            <div class="seatNum" v-for="seatNum in seat" :key="seatNum.index">
                                <label><input type="checkbox" name="label" :value="seatNum" v-model="selectedSeats">
                                    <span class="round button">
                                    {{seatNum}}
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="carNo">
                    <div class="singleCar" v-for="(carNo, index) in carNos" :key="carNo.index" @click="keyInCarNo(index)">
                        {{carNo}}
                    </div>
                </div>
                <div class="selectedCar">
                    車廂 : {{showSelectedCar}}
                </div>
            </div>
            <div class="selectedSeats">
                您選擇 
                <div class="selectedSeat" v-for="selectedSeat in selectedSeats" :key="selectedSeat.index">
                    {{selectedSeat}}
                </div>
                號座位
                <div class="switch" v-if="searchInfo.oneWayOrNot === 'true' ">
                    <div class="going btn btn-warning btn-sm" v-show="goingSeatTable" @click="switchBack">選擇回程座位</div>
                    <div class="back btn btn-warning btn-sm" v-show="backSeatTable" @click="switchGoing">選擇去程座位</div>
                </div>
            </div>
        </div>
        <div class="bookingButton row justify-content-center">
            <div class="btn btn-outline-success" @click="goBook">
                訂票
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
  data() {
    return{
        stops: [
            { name: "請選擇" , value: "" },
            { name: "南港" , value: "0990" },
            { name: "台北" , value: "1000" },
            { name: "板橋" , value: "1010" },
            { name: "桃園" , value: "1020" },
            { name: "新竹" , value: "1030" },
            { name: "苗栗" , value: "1035" },
            { name: "台中" , value: "1040" },
            { name: "彰化" , value: "1043" },
            { name: "雲林" , value: "1047" },
            { name: "嘉義" , value: "1050" },
            { name: "台南" , value: "1060" },
            { name: "左營" , value: "1070" }
        ],
        ticketCountNums: [
            { num: "0" , value: "0" },
            { num: "1" , value: "1" },
            { num: "2" , value: "2" },
            { num: "3" , value: "3" },
            { num: "4" , value: "4" },
            { num: "5" , value: "5" },
            { num: "6" , value: "6" },
            { num: "7" , value: "7" },
            { num: "8" , value: "8" },
            { num: "9" , value: "9" },
            { num: "10" , value: "10" }
        ],
        isBusinessDisabled: false,
        isStandardDisabled: false,
        searchInfo: {
            departure: { name: "請選擇" ,value: "" },
            arrival: { name: "請選擇" , value: "" },
            oneWayOrNot: "false",
            departDate: "",
            backDepartDate: ""
        },
        selectedTrain: [],
        selectedBackTrain: [],
        userId: "",
        carType: "",
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
        totalSeat: 0,
        seats: [
            ["A01", "A02", "A03", "A04", "A05", "A06", "A07", "A08", "A09", "A10", "A11", "A12", "A13", "A14", "A15", "A16", "A17", "A18", "A19", "A20", ],
            ["B01", "B02", "B03", "B04", "B05", "B06", "B07", "B08", "B09", "B10", "B11", "B12", "B13", "B14", "B15", "B16", "B17", "B18", "B19", "B20", ],
            ["C01", "C02", "C03", "C04", "C05", "C06", "C07", "C08", "C09", "C10", "C11", "C12", "C13", "C14", "C15", "C16", "C17", "C18", "C19", "C20", ],
            ["D01", "D02", "D03", "D04", "D05", "D06", "D07", "D08", "D09", "D10", "D11", "D12", "D13", "D14", "D15", "D16", "D17", "D18", "D19", "D20", ],
            ["E01", "E02", "E03", "E04", "E05", "E06", "E07", "E08", "E09", "E10", "E11", "E12", "E13", "E14", "E15", "E16", "E17", "E18", "E19", "E20", ],
            ["F01", "F02", "F03", "F04", "F05", "F06", "F07", "F08", "F09", "F10", "F11", "F12", "F13", "F14", "F15", "F16", "F17", "F18", "F19", "F20", ],
            ["G01", "G02", "G03", "G04", "G05", "G06", "G07", "G08", "G09", "G10", "G11", "G12", "G13", "G14", "G15", "G16", "G17", "G18", "G19", "G20", ],
            ["H01", "H02", "H03", "H04", "H05", "H06", "H07", "H08", "H09", "H10", "H11", "H12", "H13", "H14", "H15", "H16", "H17", "H18", "H19", "H20", ],
            ["I01", "I02", "I03", "I04", "I05", "I06", "I07", "I08", "I09", "I10", "I11", "I12", "I13", "I14", "I15", "I16", "I17", "I18", "I19", "I20", ],
            ["J01", "J02", "J03", "J04", "J05", "J06", "J07", "J08", "J09", "J10", "J11", "J12", "J13", "J14", "J15", "J16", "J17", "J18", "J19", "J20", ],
        ],
        carNos: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
        selectedCar: "0",
        showSelectedCar: "A",
        goingSeatTable: true,
        backSeatTable: false,
        selectedSeats: [],
        goingSeats: [],
        backSeats: [],
    };
  },
  computed: {

  },
  created() {
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
  mounted()  {
    if ( this.searchInfo.oneWayOrNot === "false" ) {
        if ( this.selectedTrain.BusinessSeatStatus == 'X' ) {
            this.isBusinessDisabled = true;
            if ( this.selectedTrain.StandardSeatStatus == 'X' ) {
                this.isStandardDisabled = true;
            }
        } else if ( this.selectedTrain.StandardSeatStatus == 'X' || this.selectedBackTrain.StandardSeatStatus == 'X' ) {
            this.isStandardDisabled = true;
        }
    } else if ( this.searchInfo.oneWayOrNot === "true" ) {
        if ( this.selectedTrain.BusinessSeatStatus == 'X' || this.selectedBackTrain.BusinessSeatStatus == 'X' ) {
            this.isBusinessDisabled = true;
            if ( this.selectedTrain.StandardSeatStatus == 'X' || this.selectedBackTrain.StandardSeatStatus == 'X' ) {
                this.isStandardDisabled = true;
            }
        } else if ( this.selectedTrain.StandardSeatStatus == 'X' || this.selectedBackTrain.StandardSeatStatus == 'X' ) {
            this.isStandardDisabled = true;
        }
    }
  },
  updated() {
    if ( this.carType === "0" ) {
        let total = 
        this.$store.state.ticketInfo.standardAdult * this.ticketCount.adult +
        this.$store.state.ticketInfo.standardKid * this.ticketCount.kid +
        this.$store.state.ticketInfo.standardKid * this.ticketCount.love +
        this.$store.state.ticketInfo.standardKid * this.ticketCount.older +
        this.$store.state.ticketInfo.standardGroup * this.ticketCount.student;
        this.goingToPrice = total;
        if ( this.searchInfo.oneWayOrNot === "true" ) {
            this.goingBackPrice = total;
        }
    } else if ( this.carType === "1" ) {
        let total =
        this.$store.state.ticketInfo.bussinessAdult * this.ticketCount.adult +
        this.$store.state.ticketInfo.bussinessKid * this.ticketCount.kid +
        this.$store.state.ticketInfo.bussinessKid * this.ticketCount.love +
        this.$store.state.ticketInfo.bussinessKid * this.ticketCount.older +
        this.$store.state.ticketInfo.bussinessGroup * this.ticketCount.student;
        this.goingToPrice = total;
        if ( this.searchInfo.oneWayOrNot === "true" ) {
            this.goingBackPrice = total;
        }
    }
    this.totalPrice = this.goingToPrice + this.goingBackPrice;

    this.totalSeat = parseInt(this.ticketCount.adult) + parseInt(this.ticketCount.kid) + parseInt(this.ticketCount.love) + parseInt(this.ticketCount.older) + parseInt(this.ticketCount.student);

    if ( this.selectedSeats.length > this.totalSeat ) {
      this.selectedSeats.pop();
      alert("請先取消選取已選取座位");
    }

    this.showSelectedCar = this.carNos[this.selectedCar];
  },
  methods: {
    keyInCarNo(index) {
        this.selectedCar = index;
    },
    switchBack() {
        this.goingSeatTable = false;
        this.backSeatTable = true;
        if ( this.backSeats.length < 1 ) {
            this.goingSeats = this.selectedSeats;
            this.selectedSeats = [];
        } else {
            this.goingSeats = this.selectedSeats;
            this.selectedSeats = this.backSeats;
        }
    },
    switchGoing() {
        this.goingSeatTable = true;
        this.backSeatTable = false;
        if ( this.goingSeats.length < 1 ) {
            this.backSeats = this.selectedSeats;
            this.selectedSeats = [];
        } else {
            this.backSeats = this.selectedSeats;
            this.selectedSeats = this.goingSeats;
        }
    },
    goBook() {
        if ( this.goingSeatTable == false ) {
            this.backSeats = this.selectedSeats;
        } else {
            this.goingSeats = this.selectedSeats;
        }
        if ( this.userId && this.searchInfo.departure && this.searchInfo.arrival && this.searchInfo.departDate && this.carType && this.selectedTrain.DailyTrainInfo.TrainNo ) {
            if ( this.searchInfo.oneWayOrNot === "false" ) {
                if ( this.ticketCount.adult > 0 || this.ticketCount.kid > 0 || this.ticketCount.love > 0 || this.ticketCount.older > 0 || this.ticketCount.student > 0 ) {
                    if ( this.goingSeats.length === this.totalSeat ) {
                        return new Promise(( resolve , reject ) => {
                            const db = getDatabase( GetfirebaseConfig() );
                            set(ref( db, 'users/' + this.userId + "/goingTo" ), {
                            startStation: this.searchInfo.departure,
                            endStation: this.searchInfo.arrival,
                            carType : this.carType,
                            date : this.searchInfo.departDate,
                            trainNo : this.selectedTrain.DailyTrainInfo.TrainNo,
                            departTime : this.selectedTrain.OriginStopTime.DepartureTime,
                            arrivalTime : this.selectedTrain.DestinationStopTime.ArrivalTime,
                            ticketCount : this.ticketCount,
                            seatsNo : this.goingSeats,
                            price : this.goingToPrice,
                            }).then( () => {
                                alert("訂票成功");
                                resolve();
                                window.location.reload();
                            })
                            .catch( () => {
                                alert("訂票失敗，請重新操作")
                                reject();
                            })
                        })
                    } else {
                        alert("請選擇座位")
                    }
                } else {
                    alert("請選擇票數")
                }
            } else if ( this.searchInfo.oneWayOrNot === "true" ) {
                if ( this.searchInfo.backDepartDate && this.selectedBackTrain.DailyTrainInfo.TrainNo ) {
                    if ( this.ticketCount.adult > 0 || this.ticketCount.kid > 0 || this.ticketCount.love > 0 || this.ticketCount.older > 0 || this.ticketCount.student > 0 ) {
                        if ( this.goingSeats.length === this.totalSeat && this.backSeats.length === this.totalSeat ) {
                            return new Promise(( resolve , reject ) => {
                                const db = getDatabase( GetfirebaseConfig() );
                                set(ref( db, 'users/' + this.userId + "/goingTo" ), {
                                startStation: this.searchInfo.departure,
                                endStation: this.searchInfo.arrival,
                                carType : this.carType,
                                date : this.searchInfo.departDate,
                                trainNo : this.selectedTrain.DailyTrainInfo.TrainNo,
                                departTime : this.selectedTrain.OriginStopTime.DepartureTime,
                                arrivalTime : this.selectedTrain.DestinationStopTime.ArrivalTime,
                                ticketCount : this.ticketCount,
                                seatsNo : this.goingSeats,
                                price : this.goingToPrice,
                                })
                                set(ref( db, 'users/' + this.userId + "/goingBack" ), {
                                startStation: this.searchInfo.arrival,
                                endStation: this.searchInfo.departure,
                                carType : this.carType,
                                date : this.searchInfo.backDepartDate,
                                trainNo : this.selectedBackTrain.DailyTrainInfo.TrainNo,
                                departTime : this.selectedBackTrain.OriginStopTime.DepartureTime,
                                arrivalTime : this.selectedBackTrain.DestinationStopTime.ArrivalTime,
                                ticketCount : this.ticketCount,
                                seatsNo : this.backSeats,
                                price : this.goingBackPrice,
                                }).then( () => {
                                    alert("訂票成功");
                                    resolve();
                                    window.location.reload();
                                })
                                .catch( () => {
                                    alert("訂票失敗，請重新操作")
                                    reject();
                                })
                            })
                        } else {
                            alert("請選擇座位");
                        }
                    } else {
                        alert("請選擇票數");
                    }
                } else {
                    alert("請輸入回程列車資訊");
                }
            }
        } else {
            alert("請輸入完整列車資訊");
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
    .seatTitle{
        text-align: center;
    }
    .seatChoice{
        margin: 5% auto;
        padding: 3% auto;
        width: 70%;
        border: 2px solid #ccc;
        text-align: center;
    }
    .seatChoice h3{
        display: inline-block;
        margin: 2% 0 0 0;
    }
    .oneTrain{
        margin: 3% auto;
    }
    .selectCar{
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }
    .seatNum{
        margin: 3% 2%;
        height: 6vh;
        width: 15%;
    }
    .selectCar :nth-child(2){
        margin-right: 12%;
    }
    .selectCar :nth-child(6){
        margin-right: 12%;
    }
    .selectCar :nth-child(10){
        margin-right: 12%;
    }
    .selectCar :nth-child(14){
        margin-right: 12%;
    }
    .selectCar :nth-child(18){
        margin-right: 12%;
    }
    .oneTrain input[type="checkbox"] {
        display: none; 
    }
    .oneTrain input:checked + .button {
        background: #5e7380; 
        color: #fff;
    }
    .oneTrain .button {
        display: inline-block;
        transform: translateX(-33%);
        background: #8ecbcf;
        padding: 100% 120%; 
        color: #333; 
        cursor: pointer;
    }
    .oneTrain .button:hover {
        background: #8ecbcf7c; 
    }
    .oneTrain .round {
        border-radius: 5px; 
    }
    #selected{
        color: rgb(68, 105, 224);
    }
    .carNo{
        margin: 2% 0;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
    }
    .singleCar{
        margin: 0 2%;
        font-size: normal;
        cursor: pointer;
        color: rgb(0, 0, 0);
        transition: 0.2s ease all;
    }
    .singleCar:hover{
        color: rgb(224, 228, 235);
        background: rgb(122, 173, 231);
        border-radius: 25%;
    }
    .selectedSeats{
        margin: 2% 0;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
    }
    .selectedSeat{
        margin: 0 1%;
    }
</style>